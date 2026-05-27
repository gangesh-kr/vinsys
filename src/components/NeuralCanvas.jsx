import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Dynamic Constellation component
function Constellation({ cursorPosition }) {
  const pointsCount = 28;
  const maxDistance = 1.35;
  const { viewport } = useThree();

  // Create initial node coordinates and movement speeds
  const [nodes, linePairs] = useMemo(() => {
    const list = [];
    for (let i = 0; i < pointsCount; i++) {
      list.push({
        baseX: (Math.random() - 0.5) * 5,
        baseY: (Math.random() - 0.5) * 4,
        baseZ: (Math.random() - 0.5) * 3,
        speedX: 0.1 + Math.random() * 0.2,
        speedY: 0.1 + Math.random() * 0.2,
        speedZ: 0.1 + Math.random() * 0.2,
        phase: Math.random() * Math.PI * 2
      });
    }

    // Determine connection pairs based on proximity threshold
    const pairs = [];
    for (let i = 0; i < pointsCount; i++) {
      for (let j = i + 1; j < pointsCount; j++) {
        pairs.push([i, j]);
      }
    }

    return [list, pairs];
  }, [pointsCount]);

  const pointsRef = useRef();
  const linesRef = useRef();

  // Keep track of current positions in float array for WebGL attributes
  const positionsArr = useMemo(() => new Float32Array(pointsCount * 3), [pointsCount]);
  const linePositionsArr = useMemo(() => new Float32Array(linePairs.length * 6), [linePairs]);
  const lineColorsArr = useMemo(() => new Float32Array(linePairs.length * 6), [linePairs]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Convert 2D cursor coords to 3D workspace coords
    const mouseX = (cursorPosition.current.x * viewport.width) / 2;
    const mouseY = (cursorPosition.current.y * viewport.height) / 2;

    // Update node positions with waves + mouse repulsion
    nodes.forEach((node, i) => {
      // Periodic compound motion
      let x = node.baseX + Math.sin(time * node.speedX + node.phase) * 0.25;
      let y = node.baseY + Math.cos(time * node.speedY + node.phase) * 0.25;
      let z = node.baseZ + Math.sin(time * node.speedZ + node.phase) * 0.2;

      // Mouse displacement calculation
      const dx = x - mouseX;
      const dy = y - mouseY;
      const distToMouse = Math.sqrt(dx * dx + dy * dy);
      
      if (distToMouse < 1.5) {
        const force = (1.5 - distToMouse) * 0.22;
        x += (dx / distToMouse) * force;
        y += (dy / distToMouse) * force;
      }

      positionsArr[i * 3] = x;
      positionsArr[i * 3 + 1] = y;
      positionsArr[i * 3 + 2] = z;
    });

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Update line vertices and fade opacity dynamically based on proximity
    let lineIndex = 0;
    linePairs.forEach(([i, j]) => {
      const x1 = positionsArr[i * 3];
      const y1 = positionsArr[i * 3 + 1];
      const z1 = positionsArr[i * 3 + 2];

      const x2 = positionsArr[j * 3];
      const y2 = positionsArr[j * 3 + 1];
      const z2 = positionsArr[j * 3 + 2];

      const dx = x1 - x2;
      const dy = y1 - y2;
      const dz = z1 - z2;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < maxDistance) {
        // Line endpoints
        linePositionsArr[lineIndex * 6] = x1;
        linePositionsArr[lineIndex * 6 + 1] = y1;
        linePositionsArr[lineIndex * 6 + 2] = z1;
        linePositionsArr[lineIndex * 6 + 3] = x2;
        linePositionsArr[lineIndex * 6 + 4] = y2;
        linePositionsArr[lineIndex * 6 + 5] = z2;

        // Line color transparency mapping
        const alpha = 1.0 - dist / maxDistance;
        const colVal = 0.15 + alpha * 0.35; // Brighten up close connections

        // Endpoint 1 colors (brand crimson gradient)
        lineColorsArr[lineIndex * 6] = 0.678; // R
        lineColorsArr[lineIndex * 6 + 1] = 0.2; // G
        lineColorsArr[lineIndex * 6 + 2] = 0.176; // B
        
        // Endpoint 2 colors (brand orange)
        lineColorsArr[lineIndex * 6 + 3] = 0.965; // R
        lineColorsArr[lineIndex * 6 + 4] = 0.576; // G
        lineColorsArr[lineIndex * 6 + 5] = 0.125; // B
        
        // Adjust alpha via vertex transparency helper
        lineColorsArr[lineIndex * 6] *= alpha;
        lineColorsArr[lineIndex * 6 + 1] *= alpha;
        lineColorsArr[lineIndex * 6 + 2] *= alpha;
        lineColorsArr[lineIndex * 6 + 3] *= alpha;
        lineColorsArr[lineIndex * 6 + 4] *= alpha;
        lineColorsArr[lineIndex * 6 + 5] *= alpha;
      } else {
        // Hide line if out of range
        linePositionsArr[lineIndex * 6] = 0;
        linePositionsArr[lineIndex * 6 + 1] = 0;
        linePositionsArr[lineIndex * 6 + 2] = 0;
        linePositionsArr[lineIndex * 6 + 3] = 0;
        linePositionsArr[lineIndex * 6 + 4] = 0;
        linePositionsArr[lineIndex * 6 + 5] = 0;
      }
      lineIndex++;
    });

    if (linesRef.current) {
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  const nodeTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.3, '#ad332d');
    grad.addColorStop(1, 'rgba(173, 51, 45, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <group>
      {/* Dynamic Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positionsArr, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          map={nodeTexture}
          transparent={true}
          opacity={0.8}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>

      {/* Dynamic Connecting Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositionsArr, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColorsArr, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors={true}
          transparent={true}
          opacity={0.65}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </lineSegments>
    </group>
  );
}

export default function NeuralCanvas({ cursorPosition }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Constellation cursorPosition={cursorPosition} />
      </Canvas>
    </div>
  );
}
