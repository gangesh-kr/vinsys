import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// Procedural soft round glowing circle texture for points
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

// Pulsing beacon component representing a global office position with a HTML overlay label
function PulsingBeacon({ position, color, name }) {
  const ringRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ringRef.current) {
      const pulseSpeed = 1.8;
      const t = (time * pulseSpeed) % 1.0;
      const scale = 1.0 + t * 2.0;
      ringRef.current.scale.set(scale, scale, scale);
      ringRef.current.material.opacity = 0.8 * (1.0 - t);
    }
  });

  return (
    <group position={position}>
      {/* Core Dot */}
      <mesh>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      
      {/* Outer Pulse Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.05, 0.08, 32]} />
        <meshBasicMaterial color={color} transparent={true} opacity={0.8} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>

      {/* Labeled HTML overlay */}
      <Html distanceFactor={7} center>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          border: `1.5px solid ${color}`,
          borderRadius: '20px',
          padding: '4px 10px',
          fontSize: '9px',
          fontWeight: 700,
          fontFamily: 'var(--font-heading)',
          color: '#1a1a1a',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
          transform: 'translateY(-22px)',
          pointerEvents: 'none',
          userSelect: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}>
          <span style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            backgroundColor: color,
            display: 'inline-block'
          }} />
          {name}
        </div>
      </Html>
    </group>
  );
}

// Component representing the glowing network globe
function Globe({ cursorPosition }) {
  const groupRef = useRef();
  const globePointsRef = useRef();

  const radius = 2.2;
  const pointsCount = 350;

  // Global office beacon locations
  const beacons = useMemo(() => [
    { name: 'Pune (Global HQ)', pos: [0.7, 0.7, radius * 0.88], color: '#ad332d' },
    { name: 'Dubai Office', pos: [0.1, 1.1, radius * 0.82], color: '#f69320' },
    { name: 'New York Office', pos: [-1.4, 0.6, radius * 0.7], color: '#f69320' },
    { name: 'London Office', pos: [-0.8, 1.3, radius * 0.72], color: '#f69320' },
    { name: 'Riyadh Office', pos: [-0.4, 0.8, radius * 0.88], color: '#ad332d' },
    { name: 'Singapore Office', pos: [1.3, -0.4, radius * 0.74], color: '#ad332d' }
  ], [radius]);

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
          size={0.12}
          map={dotTexture}
          transparent={true}
          opacity={0.8}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>

      {/* 2. Inner Grid Sphere (Latitude/Longitude lines) */}
      <mesh>
        <sphereGeometry args={[radius * 0.98, 24, 24]} />
        <meshBasicMaterial
          color="#888888"
          wireframe={true}
          transparent={true}
          opacity={0.48}
        />
      </mesh>

      {/* 3. Static Connection Lines (Global routing paths) */}
      {curves.map((curve, idx) => {
        const linePoints = curve.getPoints(30);
        const geometry = new THREE.BufferGeometry().setFromPoints(linePoints);
        return (
          <line key={idx} geometry={geometry}>
            <lineBasicMaterial
              color="#ad332d"
              transparent={true}
              opacity={0.65}
              blending={THREE.NormalBlending}
            />
          </line>
        );
      })}

      {/* 4. Tilted Orbital Globe Rings (Satellite/Data tracks) */}
      {/* Red/Crimson Ring */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <ringGeometry args={[radius + 0.05, radius + 0.09, 64]} />
        <meshBasicMaterial color="#ad332d" side={THREE.DoubleSide} transparent opacity={0.4} />
      </mesh>
      {/* Orange Ring */}
      <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <ringGeometry args={[radius + 0.12, radius + 0.16, 64]} />
        <meshBasicMaterial color="#f69320" side={THREE.DoubleSide} transparent opacity={0.35} />
      </mesh>
      {/* Amber/Gold Ring */}
      <mesh rotation={[Math.PI / 2.2, Math.PI / 4, Math.PI / 8]}>
        <ringGeometry args={[radius + 0.19, radius + 0.22, 64]} />
        <meshBasicMaterial color="#ffb42f" side={THREE.DoubleSide} transparent opacity={0.3} />
      </mesh>

      {/* 5. Animated Data Packets (Glowing Spheres) */}
      {curves.map((_, idx) => (
        <mesh
          key={`packet-${idx}`}
          ref={(el) => (packetRefs.current[idx] = el)}
        >
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial
            color="#ffb42f"
            transparent={true}
            opacity={0.95}
            blending={THREE.NormalBlending}
          />
        </mesh>
      ))}

      {/* 6. Labeled Pulsing Beacons (Global Operational Centers) */}
      {beacons.map((beacon, idx) => (
        <PulsingBeacon
          key={idx}
          position={beacon.pos}
          color={beacon.color}
          name={beacon.name}
        />
      ))}
    </group>
  );
}

function DustParticles() {
  const pointsRef = useRef();
  const count = 120;

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sp = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      sp[i] = 0.05 + Math.random() * 0.05;
    }
    return [pos, sp];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.015;
      pointsRef.current.rotation.x = time * 0.008;

      const positionsArray = pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        positionsArray[i * 3 + 1] += speeds[i] * 0.015;
        if (positionsArray[i * 3 + 1] > 4) {
          positionsArray[i * 3 + 1] = -4;
        }
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
        size={0.03}
        color="#ad332d"
        transparent={true}
        opacity={0.25}
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
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
        <DustParticles />
      </Canvas>
    </div>
  );
}
