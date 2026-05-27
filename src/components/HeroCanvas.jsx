import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Procedural soft round glowing circle texture
const createDotTexture = (color = '#ad332d') => {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  
  // Outer soft glow, inner sharp core
  const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.2, color);
  grad.addColorStop(0.5, 'rgba(173, 51, 45, 0.4)');
  grad.addColorStop(1, 'rgba(173, 51, 45, 0)');
  
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 32, 32);
  
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

// Component representing the glowing network globe
function Globe({ cursorPosition }) {
  const groupRef = useRef();
  const globePointsRef = useRef();
  
  const radius = 2.2;
  const pointsCount = 350;

  // Generate Fibonacci Sphere points
  const [pointsPositions, dotTexture] = useMemo(() => {
    const positions = new Float32Array(pointsCount * 3);
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = Math.PI * 2 * goldenRatio;

    for (let i = 0; i < pointsCount; i++) {
      const t = i / pointsCount;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;

      const x = radius * Math.sin(inclination) * Math.cos(azimuth);
      const y = radius * Math.cos(inclination);
      const z = radius * Math.sin(inclination) * Math.sin(azimuth);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    return [positions, createDotTexture('#ad332d')];
  }, [pointsCount, radius]);

  // Generate 8 global connectivity curves
  const curves = useMemo(() => {
    const list = [];
    const pointsArray = [];
    
    // Convert pos typed array to vectors
    for (let i = 0; i < pointsCount; i += 40) {
      pointsArray.push(new THREE.Vector3(
        pointsPositions[i * 3],
        pointsPositions[i * 3 + 1],
        pointsPositions[i * 3 + 2]
      ));
    }

    // Connect pairs of points with Bezier curves bending outwards
    for (let i = 0; i < pointsArray.length - 1; i += 2) {
      const p1 = pointsArray[i];
      const p2 = pointsArray[i + 1];
      if (!p1 || !p2) continue;

      // Calculate midpoint and pull it outwards radially
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      const outDistance = p1.distanceTo(p2) * 0.45;
      mid.normalize().multiplyScalar(radius + outDistance);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      list.push(curve);
    }
    return list;
  }, [pointsPositions, pointsCount, radius]);

  // Data packets traversing the curves
  const packets = useMemo(() => {
    return curves.map(() => ({
      progress: Math.random(),
      speed: 0.005 + Math.random() * 0.008
    }));
  }, [curves]);

  const packetRefs = useRef([]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Rotate globe automatically
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.04;
      
      // Merge cursor parallax rotation
      const targetX = (cursorPosition.current.x * Math.PI) * 0.15;
      const targetY = (cursorPosition.current.y * Math.PI) * 0.15;
      
      groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
    }

    // Animate network packet coordinates along bezier paths
    packetRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const pData = packets[index];
      pData.progress += pData.speed;
      if (pData.progress > 1) pData.progress = 0;

      const curve = curves[index];
      const point = curve.getPointAt(pData.progress);
      ref.position.copy(point);
    });
  });

  return (
    <group ref={groupRef}>
      {/* 1. Global Point Cloud */}
      <points ref={globePointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pointsPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          map={dotTexture}
          transparent={true}
          opacity={0.7}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>

      {/* 2. Inner Grid Sphere */}
      <mesh>
        <sphereGeometry args={[radius * 0.98, 24, 24]} />
        <meshBasicMaterial
          color="#e5e5e5"
          wireframe={true}
          transparent={true}
          opacity={0.15}
        />
      </mesh>

      {/* 3. Static Connection Lines */}
      {curves.map((curve, idx) => {
        const linePoints = curve.getPoints(30);
        const geometry = new THREE.BufferGeometry().setFromPoints(linePoints);
        return (
          <line key={idx} geometry={geometry}>
            <lineBasicMaterial
              color="#f69320"
              transparent={true}
              opacity={0.2}
              blending={THREE.NormalBlending}
            />
          </line>
        );
      })}

      {/* 4. Animated Data Packets (Glowing Spheres) */}
      {curves.map((_, idx) => (
        <mesh
          key={`packet-${idx}`}
          ref={(el) => (packetRefs.current[idx] = el)}
        >
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial
            color="#ffb42f"
            transparent={true}
            opacity={0.9}
            blending={THREE.NormalBlending}
          />
        </mesh>
      ))}

      {/* 5. Vinsys Global HQ Beacon (Pune, India - approx location) */}
      <mesh position={[0.7, 0.7, radius * 0.88]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial
          color="#ad332d"
          transparent={true}
          opacity={0.9}
          blending={THREE.NormalBlending}
        />
      </mesh>
      <mesh position={[0.7, 0.7, radius * 0.88]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial
          color="#ad332d"
          transparent={true}
          opacity={0.25}
          blending={THREE.NormalBlending}
        />
      </mesh>
    </group>
  );
}

export default function HeroCanvas({ cursorPosition }) {
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
        maskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <Globe cursorPosition={cursorPosition} />
      </Canvas>
    </div>
  );
}
