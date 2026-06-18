import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ══ Cube verre holographique ══ */
function GlassCube({ color }: { color: string }) {
  const mesh  = useRef<THREE.Mesh>(null);
  const edges = useRef<THREE.LineSegments>(null);
  const halo  = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  /* Matériau verre coloré semi-transparent */
  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color:            new THREE.Color(color).multiplyScalar(0.15),
    emissive:         new THREE.Color(color),
    emissiveIntensity: 0.4,
    transparent:      true,
    opacity:          0.18,
    roughness:        0.0,
    metalness:        0.05,
    transmission:     0.85,
    thickness:        0.6,
    ior:              1.5,
    side:             THREE.DoubleSide,
    depthWrite:       false,
  }), []);

  /* Arêtes néon colorées */
  const edgeMat = useMemo(() => new THREE.LineBasicMaterial({
    color:       new THREE.Color(color),
    transparent: true,
    opacity:     1,
  }), []);

  /* Halo extérieur coloré */
  const haloMat = useMemo(() => new THREE.MeshBasicMaterial({
    color:       new THREE.Color(color),
    transparent: true,
    opacity:     0.04,
    side:        THREE.BackSide,
    blending:    THREE.AdditiveBlending,
    depthWrite:  false,
  }), []);

  /* Cœur interne pulsant */
  const innerMat = useMemo(() => new THREE.MeshBasicMaterial({
    color:       new THREE.Color(color),
    transparent: true,
    opacity:     0.08,
    blending:    THREE.AdditiveBlending,
    depthWrite:  false,
  }), []);

  const geo      = useMemo(() => new THREE.BoxGeometry(1, 1, 1, 1, 1, 1), []);
  const edgeGeo  = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => { glassMat.emissive.set(color); edgeMat.color.set(color); haloMat.color.set(color); innerMat.color.set(color); }, [color]);

  useFrame(({ clock }) => {
    const t  = clock.elapsedTime;
    const rY = t * 0.45;
    const rX = t * 0.22;
    const pY = Math.sin(t * 1.3) * 0.06;

    /* Rotation + flottement */
    [mesh, edges, halo, inner].forEach(r => {
      if (!r.current) return;
      r.current.rotation.y = rY;
      r.current.rotation.x = rX;
      r.current.position.y = pY;
    });

    /* Pulsation émission */
    if (mesh.current) {
      const m = mesh.current.material as THREE.MeshPhysicalMaterial;
      m.emissiveIntensity = 0.3 + Math.sin(t * 2.5) * 0.2;
    }
    /* Pulsation arêtes */
    if (edges.current) {
      const m = edges.current.material as THREE.LineBasicMaterial;
      m.opacity = 0.75 + Math.sin(t * 3.5) * 0.25;
    }
    /* Pulsation halo */
    if (halo.current) {
      const m = halo.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.03 + Math.sin(t * 1.8) * 0.02;
    }
    /* Pulsation cœur */
    if (inner.current) {
      const m = inner.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.06 + Math.sin(t * 2.2 + 1) * 0.04;
    }
  });

  return (
    <>
      {/* Corps vitré */}
      <mesh ref={mesh} geometry={geo} material={glassMat} />
      {/* Arêtes néon */}
      <lineSegments ref={edges} geometry={edgeGeo} material={edgeMat} />
      {/* Halo extérieur */}
      <mesh ref={halo} material={haloMat} scale={[1.5, 1.5, 1.5]}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
      {/* Cœur interne */}
      <mesh ref={inner} material={innerMat} scale={[0.55, 0.55, 0.55]}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
    </>
  );
}

/* ══ Rayons lumineux sur les arêtes ══ */
function EdgeRays({ color }: { color: string }) {
  const ref = useRef<THREE.Group>(null);

  const rays = useMemo(() => {
    const pts: [number, number, number][] = [
      [ 0.5,  0.5,  0.5], [-0.5,  0.5,  0.5],
      [ 0.5, -0.5,  0.5], [-0.5, -0.5,  0.5],
      [ 0.5,  0.5, -0.5], [-0.5,  0.5, -0.5],
      [ 0.5, -0.5, -0.5], [-0.5, -0.5, -0.5],
    ];
    return pts;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = t * 0.45;
      ref.current.rotation.x = t * 0.22;
      ref.current.position.y = Math.sin(t * 1.3) * 0.06;
    }
  });

  return (
    <group ref={ref}>
      {rays.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ══ Particules orbitales ══ */
function Particles() {
  const ref   = useRef<THREE.Points>(null);
  const count = 80;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 1.0 + Math.random() * 0.7;
      arr[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      arr[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i*3+2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y =  clock.elapsedTime * 0.18;
      ref.current.rotation.x =  clock.elapsedTime * 0.09;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#00BFFF"
        size={0.022}
        transparent opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ══ Reflet sous le cube ══ */
function Reflection() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const m = ref.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.06 + Math.sin(clock.elapsedTime * 1.5) * 0.02;
    }
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]}>
      <planeGeometry args={[1.6, 1.6]} />
      <meshBasicMaterial
        color="#00BFFF"
        transparent opacity={0.07}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ══ Lumières dynamiques ══ */
function Lights({ color }: { color: string }) {
  const l1 = useRef<THREE.PointLight>(null);
  const l2 = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (l1.current) l1.current.intensity = 3 + Math.sin(t * 2) * 1;
    if (l2.current) l2.current.intensity = 2 + Math.sin(t * 1.5 + 1) * 0.8;
  });
  return (
    <>
      <ambientLight intensity={0.15} color="#000814" />
      <pointLight ref={l1} position={[2, 2, 2]}   color={color} intensity={3} />
      <pointLight ref={l2} position={[-2, -1, -2]} color={color} intensity={2} />
      <pointLight position={[0, 3, 0]} color="#ffffff" intensity={0.4} />
    </>
  );
}

/* ══ Scène complète ══ */
function Scene({ color }: { color: string }) {
  return (
    <>
      <Lights color={color} />
      <GlassCube color={color} />
      <EdgeRays color={color} />
      <Particles />
      <Reflection />
    </>
  );
}

/* ══ Export ══ */
export default function HoloCube({ size = 80, color = '#00BFFF' }: { size?: number; color?: string }) {
  return (
    <div style={{ width: size, height: size, flexShrink: 0, background: 'transparent', overflow: 'visible' }}>
      <Canvas
        camera={{ position: [0, 0, 2.2], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          premultipliedAlpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.4,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.setClearAlpha(0);
        }}
        style={{ background: 'transparent', display: 'block' }}
      >
        <Scene color={color} />
      </Canvas>
    </div>
  );
}

