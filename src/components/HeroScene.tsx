import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

/* ══════════════════════════════════════════
   CUBE HOLOGRAPHIQUE CENTRAL
══════════════════════════════════════════ */
function CentralCube() {
  const mesh  = useRef<THREE.Mesh>(null);
  const edges = useRef<THREE.LineSegments>(null);
  const halo  = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  const geo     = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const edgeGeo = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);

  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#001a3a'),
    emissive: new THREE.Color('#0044cc'),
    emissiveIntensity: 0.5,
    transparent: true, opacity: 0.18,
    roughness: 0.0, metalness: 0.05,
    transmission: 0.85, thickness: 0.6,
    side: THREE.DoubleSide, depthWrite: false,
  }), []);

  const edgeMat = useMemo(() => new THREE.LineBasicMaterial({
    color: new THREE.Color('#00BFFF'), transparent: true, opacity: 1,
  }), []);

  const haloMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color('#00BFFF'), transparent: true, opacity: 0.04,
    side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false,
  }), []);

  const innerMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color('#00BFFF'), transparent: true, opacity: 0.08,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const rY = t * 0.45, rX = t * 0.22;
    const pY = Math.sin(t * 1.3) * 0.08;
    [mesh, edges, halo, inner].forEach(r => {
      if (!r.current) return;
      r.current.rotation.y = rY;
      r.current.rotation.x = rX;
      r.current.position.y = pY;
    });
    if (mesh.current)
      (mesh.current.material as THREE.MeshPhysicalMaterial).emissiveIntensity =
        0.4 + Math.sin(t * 2.5) * 0.25;
    if (edges.current)
      (edges.current.material as THREE.LineBasicMaterial).opacity =
        0.7 + Math.sin(t * 3.5) * 0.3;
    if (halo.current)
      (halo.current.material as THREE.MeshBasicMaterial).opacity =
        0.03 + Math.sin(t * 1.8) * 0.02;
    if (inner.current)
      (inner.current.material as THREE.MeshBasicMaterial).opacity =
        0.06 + Math.sin(t * 2.2 + 1) * 0.04;
  });

  return (
    <>
      <mesh ref={mesh} geometry={geo} material={glassMat} />
      <lineSegments ref={edges} geometry={edgeGeo} material={edgeMat} />
      <mesh ref={halo} material={haloMat} scale={[1.6, 1.6, 1.6]}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
      <mesh ref={inner} material={innerMat} scale={[0.5, 0.5, 0.5]}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
      {/* Coins lumineux */}
      {([
        [0.5,0.5,0.5],[-0.5,0.5,0.5],[0.5,-0.5,0.5],[-0.5,-0.5,0.5],
        [0.5,0.5,-0.5],[-0.5,0.5,-0.5],[0.5,-0.5,-0.5],[-0.5,-0.5,-0.5],
      ] as [number,number,number][]).map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshBasicMaterial color="#00BFFF" transparent opacity={0.9}
            blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
    </>
  );
}

/* ══════════════════════════════════════════
   ANNEAUX ORBITAUX
══════════════════════════════════════════ */
function OrbitalRings() {
  const r1 = useRef<THREE.Group>(null);
  const r2 = useRef<THREE.Group>(null);
  const r3 = useRef<THREE.Group>(null);

  const ringGeo  = useMemo(() => new THREE.TorusGeometry(1.8, 0.006, 6, 120), []);
  const ringMat  = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#00BFFF', transparent: true, opacity: 0.35,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }), []);

  /* Particules sur anneaux */
  const makeRingParticles = (count: number) => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      arr[i*3]   = Math.cos(a) * 1.8;
      arr[i*3+1] = 0;
      arr[i*3+2] = Math.sin(a) * 1.8;
    }
    return arr;
  };
  const rp = useMemo(() => makeRingParticles(60), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (r1.current) r1.current.rotation.y = t * 0.3;
    if (r2.current) { r2.current.rotation.y = -t * 0.2; r2.current.rotation.z = t * 0.1; }
    if (r3.current) r3.current.rotation.x = t * 0.25;
  });

  return (
    <>
      {/* Anneau horizontal */}
      <group ref={r1}>
        <mesh geometry={ringGeo} material={ringMat} />
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[rp, 3]} />
          </bufferGeometry>
          <pointsMaterial color="#00BFFF" size={0.03} transparent opacity={0.8}
            sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
        </points>
      </group>
      {/* Anneau incliné 45° */}
      <group ref={r2} rotation={[Math.PI/4, 0, 0]}>
        <mesh geometry={ringGeo} material={ringMat} />
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[rp, 3]} />
          </bufferGeometry>
          <pointsMaterial color="#1A6BFF" size={0.025} transparent opacity={0.7}
            sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
        </points>
      </group>
      {/* Anneau vertical */}
      <group ref={r3} rotation={[Math.PI/2, 0, 0]}>
        <mesh geometry={ringGeo} material={ringMat} />
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[rp, 3]} />
          </bufferGeometry>
          <pointsMaterial color="#00eeff" size={0.02} transparent opacity={0.6}
            sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
        </points>
      </group>
    </>
  );
}

/* ══════════════════════════════════════════
   RÉSEAU DE VILLES AFRICAINES
══════════════════════════════════════════ */
const CITIES = [
  { name: 'Abidjan',       pos: [-1.6,  0.2,  0.8] as [number,number,number] },
  { name: 'Lagos',         pos: [-1.2,  0.4,  1.2] as [number,number,number] },
  { name: 'Accra',         pos: [-1.8, -0.1,  0.6] as [number,number,number] },
  { name: 'Nairobi',       pos: [ 1.4,  0.0,  0.8] as [number,number,number] },
  { name: 'Casablanca',    pos: [-0.8,  1.2, -1.0] as [number,number,number] },
  { name: 'Dakar',         pos: [-2.0,  0.6, -0.4] as [number,number,number] },
  { name: 'Johannesburg',  pos: [ 1.0, -1.4,  0.4] as [number,number,number] },
  { name: 'Le Caire',      pos: [ 0.6,  1.4, -1.2] as [number,number,number] },
  { name: 'Ouagadougou',   pos: [-1.0,  0.8,  0.3] as [number,number,number] },
  { name: 'Kinshasa',      pos: [ 0.8, -0.6,  1.4] as [number,number,number] },
  { name: 'Addis-Abeba',   pos: [ 1.8,  0.8,  0.2] as [number,number,number] },
  { name: 'Tunis',         pos: [ 0.2,  1.8, -0.8] as [number,number,number] },
];

function CityNode({ pos, index, name }: { pos: [number,number,number]; index: number; name: string }) {
  const ref  = useRef<THREE.Mesh>(null);
  const gRef = useRef<THREE.Mesh>(null);
  const labelRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + index * 0.8;
    const dy = Math.sin(t * 1.2) * 0.06;
    if (ref.current)   ref.current.position.y   = pos[1] + dy;
    if (gRef.current)  {
      gRef.current.position.y = pos[1] + dy;
      (gRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.05 + Math.sin(t * 2) * 0.03;
    }
    if (labelRef.current) labelRef.current.position.y = pos[1] + dy + 0.22;
  });

  return (
    <>
      {/* Nœud */}
      <mesh ref={ref} position={pos}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshBasicMaterial color="#00BFFF" transparent opacity={0.95}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Label ville */}
      <group ref={labelRef} position={[pos[0], pos[1] + 0.22, pos[2]]}>
        <Html center distanceFactor={6} zIndexRange={[0, 0]}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '9px',
            fontWeight: 600,
            color: '#00BFFF',
            textShadow: '0 0 8px #00BFFF, 0 0 16px rgba(0,191,255,0.5)',
            whiteSpace: 'nowrap',
            letterSpacing: '0.08em',
            pointerEvents: 'none',
            userSelect: 'none',
          }}>{name}</span>
        </Html>
      </group>
      {/* Halo nœud */}
      <mesh ref={gRef} position={pos}>
        <sphereGeometry args={[0.2, 12, 12]} />
        <meshBasicMaterial color="#00BFFF" transparent opacity={0.06}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </>
  );
}

function NetworkLines() {
  const ref = useRef<THREE.Group>(null);

  /* Lignes statiques entre villes proches */
  const lines = useMemo(() => {
    const result: { from: [number,number,number]; to: [number,number,number] }[] = [];
    for (let i = 0; i < CITIES.length; i++) {
      for (let j = i + 1; j < CITIES.length; j++) {
        const a = CITIES[i].pos, b = CITIES[j].pos;
        const d = Math.hypot(a[0]-b[0], a[1]-b[1], a[2]-b[2]);
        if (d < 2.2) result.push({ from: a, to: b });
      }
    }
    return result;
  }, []);

  /* Paquets de données sur chaque ligne */
  const packets = useRef<{ t: number; speed: number; lineIdx: number }[]>(
    lines.map((_, i) => ({ t: Math.random(), speed: 0.3 + Math.random() * 0.4, lineIdx: i }))
  );
  const packetMesh = useRef<THREE.Points>(null);

  useFrame(({ clock: _clock }, delta) => {
    packets.current.forEach(p => { p.t = (p.t + delta * p.speed) % 1; });
    if (packetMesh.current) {
      const pos = packetMesh.current.geometry.attributes.position as THREE.BufferAttribute;
      packets.current.forEach((p, i) => {
        const l = lines[p.lineIdx];
        pos.setXYZ(
          i,
          l.from[0] + (l.to[0] - l.from[0]) * p.t,
          l.from[1] + (l.to[1] - l.from[1]) * p.t,
          l.from[2] + (l.to[2] - l.from[2]) * p.t,
        );
      });
      pos.needsUpdate = true;
    }
  });

  const packetPositions = useMemo(
    () => new Float32Array(lines.length * 3), [lines.length]
  );

  const lineSegments = useMemo(() => {
    const pts: number[] = [];
    lines.forEach(l => {
      pts.push(...l.from, ...l.to);
    });
    return new Float32Array(pts);
  }, [lines]);

  return (
    <group ref={ref}>
      {/* Lignes de connexion */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lineSegments, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#1A6BFF" transparent opacity={0.25}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
      {/* Paquets de données */}
      <points ref={packetMesh}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[packetPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#00BFFF" size={0.06} transparent opacity={0.95}
          sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  );
}

/* ══════════════════════════════════════════
   SPHÈRE DE PARTICULES HOLOGRAPHIQUE
══════════════════════════════════════════ */
function ParticleSphere() {
  const ref = useRef<THREE.Points>(null);
  const count = 1200;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 2.8 + (Math.random() - 0.5) * 0.6;
      arr[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      arr[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i*3+2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.05;
      ref.current.rotation.x = clock.elapsedTime * 0.025;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#00BFFF" size={0.012} transparent opacity={0.5}
        sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

/* ══════════════════════════════════════════
   GRILLE HOLOGRAPHIQUE AU SOL
══════════════════════════════════════════ */
function HoloGrid() {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pts: number[] = [];
    const size = 5, step = 0.5;
    for (let x = -size; x <= size; x += step) {
      pts.push(x, -2.2, -size,  x, -2.2, size);
    }
    for (let z = -size; z <= size; z += step) {
      pts.push(-size, -2.2, z,  size, -2.2, z);
    }
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pts), 3));
    return g;
  }, []);

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color="#1A6BFF" transparent opacity={0.07}
        blending={THREE.AdditiveBlending} depthWrite={false} />
    </lineSegments>
  );
}

/* ══════════════════════════════════════════
   REFLET SOL
══════════════════════════════════════════ */
function FloorReflection() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current)
      (ref.current.material as THREE.MeshBasicMaterial).opacity =
        0.05 + Math.sin(clock.elapsedTime * 1.2) * 0.02;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}>
      <planeGeometry args={[6, 6]} />
      <meshBasicMaterial color="#00BFFF" transparent opacity={0.06}
        blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

/* ══════════════════════════════════════════
   LUMIÈRES
══════════════════════════════════════════ */
function Lights() {
  const l1 = useRef<THREE.PointLight>(null);
  const l2 = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (l1.current) l1.current.intensity = 3 + Math.sin(t * 2) * 1;
    if (l2.current) l2.current.intensity = 2 + Math.sin(t * 1.5 + 1) * 0.8;
  });
  return (
    <>
      <ambientLight intensity={0.1} color="#000814" />
      <pointLight ref={l1} position={[2, 2, 2]}   color="#00BFFF" intensity={3} />
      <pointLight ref={l2} position={[-2, -1, -2]} color="#0055ff" intensity={2} />
      <pointLight position={[0, 3, 0]} color="#ffffff" intensity={0.3} />
    </>
  );
}

/* ══════════════════════════════════════════
   SCÈNE COMPLÈTE
══════════════════════════════════════════ */
function Scene() {
  return (
    <>
      <Lights />
      <ParticleSphere />
      <HoloGrid />
      <FloorReflection />
      <OrbitalRings />
      <CentralCube />
      {CITIES.map((c, i) => <CityNode key={c.name} pos={c.pos} index={i} name={c.name} />)}
      <NetworkLines />
    </>
  );
}

/* ══════════════════════════════════════════
   EXPORT
══════════════════════════════════════════ */
export default function HeroScene() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 480 }}>
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 50 }}
        gl={{
          antialias: true, alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.4,
        }}
        onCreated={({ gl }) => { gl.setClearColor(0x000000, 0); gl.setClearAlpha(0); }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
