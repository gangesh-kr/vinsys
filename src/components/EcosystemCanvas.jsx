import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Color map based on brand palette
const COLOR_MAP = {
  1: '#ad332d', // var(--brand-crimson)
  2: '#f69320', // var(--brand-orange)
  3: '#ffb42f', // var(--brand-amber)
  4: '#ad332d', // var(--brand-crimson)
  5: '#f69320', // var(--brand-orange)
  6: '#ffb42f'  // var(--brand-amber)
};

// Node targets in 3D space, approximating the positions of the 6 HTML cards
const NODE_POSITIONS = {
  1: [-2.4, 1.8, -0.2],  // Top Left (SoftSol)
  2: [-2.8, -0.1, 0.0],  // Middle Left (ITTrain)
  3: [-2.4, -2.0, 0.2],  // Bottom Left (AIAcad)
  4: [2.4, 1.8, -0.2],   // Top Right (BizAcad)
  5: [2.8, -0.1, 0.0],   // Middle Right (DigLearn)
  6: [2.2, -2.0, 0.2]    // Bottom Right (ResRec)
};

// Anchor points on the brain surface for each service connection
const BRAIN_ANCHORS = {
  1: [-0.35, 0.35, 0.5],   // Frontal Left
  2: [-0.55, 0.05, 0.1],   // Temporal Left
  3: [-0.35, -0.35, 0.5],  // Occipital Left
  4: [0.35, 0.35, 0.5],    // Frontal Right
  5: [0.55, 0.05, 0.1],    // Temporal Right
  6: [0.35, -0.35, 0.5]    // Occipital Right
};

// Helper to create a circular particle texture
const createDotTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.4, '#ad332d');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 16, 16);
  return new THREE.CanvasTexture(canvas);
};

// Procedural 3D Brain Point Cloud Component
function BrainPointCloud({ hoveredNode }) {
  const pointsRef = useRef();
  const geometryRef = useRef();
  const count = 1000;

  // Generate brain coordinates
  const [positions, colors, initialPositions, initialColors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      let x, y, z;
      const type = Math.random();
      let lobeId = 1;

      if (type < 0.78) {
        // Cerebral Hemispheres
        const theta = Math.random() * Math.PI;
        const phi = Math.random() * Math.PI * 2;

        // Ellipsoid base dimensions
        const rx = 0.65;
        const ry = 0.75;
        const rz = 1.0;

        let px = rx * Math.sin(theta) * Math.cos(phi);
        let py = ry * Math.cos(theta);
        let pz = rz * Math.sin(theta) * Math.sin(phi);

        // Add organic wrinkles/folds (gyri & sulci)
        const fold = 0.14 * Math.sin(phi * 12) * Math.sin(theta * 10) * Math.cos(theta * 3) +
          0.04 * Math.sin(phi * 26) * Math.cos(theta * 20);

        px += px * fold;
        py += py * fold;
        pz += pz * fold;

        // Separate hemispheres along X
        if (px < 0) {
          px -= 0.06;
          // Determine left lobes
          if (py > 0.1 && pz > 0) lobeId = 1; // Frontal Lobe Left
          else if (pz < 0) lobeId = 3;        // Occipital Lobe Left
          else lobeId = 2;                    // Temporal Lobe Left
        } else {
          px += 0.06;
          // Determine right lobes
          if (py > 0.1 && pz > 0) lobeId = 4; // Frontal Lobe Right
          else if (pz < 0) lobeId = 6;        // Occipital Lobe Right
          else lobeId = 5;                    // Temporal Lobe Right
        }

        x = px;
        y = py + 0.15; // Shift up slightly
        z = pz;
      } else if (type < 0.92) {
        // Cerebellum (dense lower-back structure)
        const theta = Math.random() * Math.PI * 0.4 + Math.PI * 0.55;
        const phi = Math.random() * Math.PI + Math.PI; // back hemisphere
        const r = 0.45 + Math.random() * 0.08;
        const fold = 0.04 * Math.sin(phi * 18) * Math.cos(theta * 18);

        x = (r + fold) * Math.sin(theta) * Math.cos(phi) * 0.75;
        y = (r + fold) * Math.cos(theta) - 0.45;
        z = (r + fold) * Math.sin(theta) * Math.sin(phi) - 0.35;
        lobeId = x < 0 ? 3 : 6; // map to occipital/bottom lobe colors
      } else {
        // Brainstem (connecting core running down)
        const t = Math.random();
        const r = 0.12 * (1.0 - t * 0.25) + Math.sin(t * 12) * 0.008;
        const angle = Math.random() * Math.PI * 2;

        x = r * Math.cos(angle);
        y = -0.45 - t * 0.65;
        z = r * Math.sin(angle) - 0.18;
        lobeId = 2; // Map to temporal base color
      }

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Assign point colors based on their lobes
      const lobeColor = new THREE.Color(COLOR_MAP[lobeId]);

      // Blend slightly with generic brain pinkish white for base state
      const baseColor = new THREE.Color('#ecc8c5');
      baseColor.lerp(lobeColor, 0.45);

      cols[i * 3] = baseColor.r;
      cols[i * 3 + 1] = baseColor.g;
      cols[i * 3 + 2] = baseColor.b;
    }

    // Return typed arrays and base copy references for dynamic animation
    return [
      pos,
      cols,
      new Float32Array(pos),
      new Float32Array(cols)
    ];
  }, [count]);

  const dotTexture = useMemo(createDotTexture, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Dynamic heartbeat pulse
    const pulse = 1.0 + 0.02 * Math.sin(time * 2.5) * Math.sin(time * 2.5 * 2.0);
    if (pointsRef.current) {
      pointsRef.current.scale.set(pulse, pulse, pulse);
    }

    if (geometryRef.current) {
      const positionsAttr = geometryRef.current.attributes.position;
      const colorsAttr = geometryRef.current.attributes.color;

      for (let i = 0; i < count; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        // Base coordinates
        const bx = initialPositions[ix];
        const by = initialPositions[iy];
        const bz = initialPositions[iz];

        // 1. Organic micro-breathing wave
        const wave = Math.sin(time * 1.2 + bx * 2.0 + by * 2.0) * 0.008;
        positionsAttr.array[ix] = bx + wave;
        positionsAttr.array[iy] = by + wave;
        positionsAttr.array[iz] = bz + wave;

        // 2. Active Lobe Interactive Glow
        if (hoveredNode) {
          const anchor = BRAIN_ANCHORS[hoveredNode];
          const dx = bx - anchor[0];
          const dy = by - anchor[1];
          const dz = bz - anchor[2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 0.45) {
            // Highlighting region
            const factor = 1.0 - dist / 0.45;
            const targetColor = new THREE.Color(COLOR_MAP[hoveredNode]);

            // Light up target lobe particles
            colorsAttr.array[ix] = THREE.MathUtils.lerp(initialColors[ix], targetColor.r * 1.3, factor);
            colorsAttr.array[iy] = THREE.MathUtils.lerp(initialColors[iy], targetColor.g * 1.3, factor);
            colorsAttr.array[iz] = THREE.MathUtils.lerp(initialColors[iz], targetColor.b * 1.3, factor);
          } else {
            // Dim out the other lobes slightly for high contrast
            colorsAttr.array[ix] = THREE.MathUtils.lerp(colorsAttr.array[ix], initialColors[ix] * 0.28, 0.1);
            colorsAttr.array[iy] = THREE.MathUtils.lerp(colorsAttr.array[iy], initialColors[iy] * 0.28, 0.1);
            colorsAttr.array[iz] = THREE.MathUtils.lerp(colorsAttr.array[iz], initialColors[iz] * 0.28, 0.1);
          }
        } else {
          // Revert colors back to normal
          colorsAttr.array[ix] = THREE.MathUtils.lerp(colorsAttr.array[ix], initialColors[ix], 0.1);
          colorsAttr.array[iy] = THREE.MathUtils.lerp(colorsAttr.array[iy], initialColors[iy], 0.1);
          colorsAttr.array[iz] = THREE.MathUtils.lerp(colorsAttr.array[iz], initialColors[iz], 0.1);
        }
      }

      positionsAttr.needsUpdate = true;
      colorsAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        map={dotTexture}
        transparent
        opacity={0.88}
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}

// Outgoing organic connection line with data packets
function ConnectionLine({ nodeId, anchorPos, nodePos, hoveredNode }) {
  const lineRef = useRef();
  const packetRef = useRef();

  const isHovered = hoveredNode === nodeId;
  const isAnyHovered = hoveredNode !== null;

  // Generate curved path from brain surface anchor to outer node coordinate
  const points = useMemo(() => {
    const start = new THREE.Vector3(...anchorPos);
    const end = new THREE.Vector3(...nodePos);

    // Add nice organic S-curve outward
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mid.z += 0.35; // Curve forward towards viewer
    mid.y += 0.15; // Curve slightly upward

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return curve;
  }, [anchorPos, nodePos]);

  const lineGeometryPoints = useMemo(() => points.getPoints(40), [points]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const baseColor = new THREE.Color(COLOR_MAP[nodeId]);
    const targetOpacity = isHovered ? 0.95 : (isAnyHovered ? 0.06 : 0.26);
    const targetWidth = isHovered ? 2.5 : 1.0;

    if (lineRef.current && lineRef.current.material) {
      lineRef.current.material.color.lerp(baseColor, 0.15);
      lineRef.current.material.opacity = THREE.MathUtils.lerp(lineRef.current.material.opacity, targetOpacity, 0.15);
      lineRef.current.material.linewidth = THREE.MathUtils.lerp(lineRef.current.material.linewidth || 1, targetWidth, 0.15);
    }

    // Animate data flow packet along the Bezier line
    if (packetRef.current) {
      const speed = isHovered ? 0.75 : 0.38;
      const progress = (time * speed) % 1.0;
      const point = points.getPointAt(progress);
      packetRef.current.position.copy(point);

      const pulse = 1.0 + Math.sin(time * 10) * 0.18;
      packetRef.current.scale.setScalar(pulse);
    }
  });

  const linePositions = useMemo(() => {
    const arr = [];
    lineGeometryPoints.forEach(p => {
      arr.push(p.x, p.y, p.z);
    });
    return new Float32Array(arr);
  }, [lineGeometryPoints]);

  return (
    <group>
      {/* Curved Stream Line */}
      <line ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={COLOR_MAP[nodeId]}
          transparent
          opacity={0.25}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </line>

      {/* Surface Attachment Point */}
      <mesh position={anchorPos}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial
          color={COLOR_MAP[nodeId]}
          transparent
          opacity={isHovered ? 1.0 : (isAnyHovered ? 0.15 : 0.65)}
        />
      </mesh>

      {/* Target Destination Endpoint Anchor */}
      <mesh position={nodePos}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial
          color={COLOR_MAP[nodeId]}
          transparent
          opacity={isHovered ? 1.0 : (isAnyHovered ? 0.22 : 0.68)}
        />
      </mesh>

      {/* Traveling Data Packet */}
      <mesh ref={packetRef}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial
          color={isHovered ? '#ffffff' : COLOR_MAP[nodeId]}
          transparent
          opacity={isAnyHovered && !isHovered ? 0.1 : 0.9}
        />
      </mesh>

      {/* Neon Ring around active destination anchor */}
      {isHovered && (
        <mesh position={nodePos}>
          <ringGeometry args={[0.11, 0.13, 32]} />
          <meshBasicMaterial
            color={COLOR_MAP[nodeId]}
            side={THREE.DoubleSide}
            transparent
            opacity={0.65}
          />
        </mesh>
      )}
    </group>
  );
}

// Background environment grid/particles for spatial context
function AmbientGrid() {
  const pointsRef = useRef();
  const count = 35;

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sp = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.8) * 4;
      sp[i] = 0.02 + Math.random() * 0.03;
    }
    return [pos, sp];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.01;
      pointsRef.current.rotation.x = time * 0.005;

      const positionsArray = pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        positionsArray[i * 3 + 1] += speeds[i] * 0.006;
        if (positionsArray[i * 3 + 1] > 3) positionsArray[i * 3 + 1] = -3;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#ad332d"
        transparent
        opacity={0.08}
        depthWrite={false}
      />
    </points>
  );
}

// Coordinate manager handles group rotation and mouse movement drift
function EcosystemScene({ cursorPosition, hoveredNode }) {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      // Parallax mouse movements
      const targetX = (cursorPosition.current.x * Math.PI) * 0.06;
      const targetY = (cursorPosition.current.y * Math.PI) * 0.06;

      groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.06;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.06;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.05, 0]}>
      {/* 3D Brain Point Cloud */}
      <BrainPointCloud hoveredNode={hoveredNode} />

      {/* 6 Curved Connection Streams to card anchors */}
      {Object.entries(NODE_POSITIONS).map(([idStr, pos]) => {
        const id = parseInt(idStr);
        return (
          <ConnectionLine
            key={id}
            nodeId={id}
            anchorPos={BRAIN_ANCHORS[id]}
            nodePos={pos}
            hoveredNode={hoveredNode}
          />
        );
      })}

      {/* Distant ambient particles */}
      <AmbientGrid />
    </group>
  );
}

export default function EcosystemCanvas({ cursorPosition, hoveredNode }) {
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
        maskImage: 'radial-gradient(circle at center, black 45%, transparent 85%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 45%, transparent 85%)',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[1, 3, 2]} intensity={1.2} />
        <EcosystemScene cursorPosition={cursorPosition} hoveredNode={hoveredNode} />
      </Canvas>
    </div>
  );
}
