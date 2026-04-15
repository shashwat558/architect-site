/**
 * HeroMesh — Robust full-screen shader quad
 *
 * Key fixes vs previous version:
 * 1. Uses perspective camera (not orthographic) — more universally
 *    supported in WebGL environments. The plane is sized to exactly
 *    fill the camera frustum at z=0 using tan(fov/2) math.
 * 2. Textures loaded with THREE.TextureLoader directly (not useTexture
 *    hook) to avoid potential R3F Suspense issues that cause blank renders.
 * 3. Error boundary feedback via onCreated callback.
 */

"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./shaders";

interface HeroMeshProps {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  smoothMouseRef: React.MutableRefObject<{ x: number; y: number }>;
  isHoveringRef: React.MutableRefObject<boolean>;
}

const SPRING = 0.06;

export default function HeroMesh({
  mouseRef,
  smoothMouseRef,
  isHoveringRef,
}: HeroMeshProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const hoverStrRef = useRef(0);
  const { size, camera } = useThree();
  const [textures, setTextures] = useState<[THREE.Texture, THREE.Texture] | null>(null);

  // Load textures imperatively — avoids Suspense race conditions
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    let cancelled = false;

    Promise.all([
      loader.loadAsync("/contructed.jpg"),
      loader.loadAsync("/blueprint.png"),
    ]).then(([photo, bp]) => {
      if (cancelled) return;
      [photo, bp].forEach(tex => {
        tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.needsUpdate = true;
      });
      setTextures([photo, bp]);
    }).catch(err => {
      console.error("[HeroMesh] Texture load failed:", err);
    });

    return () => { cancelled = true; };
  }, []);

  // Build uniforms with placeholder textures initially (1×1 white pixel)
  const placeholder = useRef((() => {
    const t = new THREE.DataTexture(new Uint8Array([200, 198, 195, 255]), 1, 1);
    t.needsUpdate = true;
    return t;
  })());

  const uniforms = useRef({
    uPhoto:         { value: placeholder.current as THREE.Texture },
    uBlueprint:     { value: placeholder.current as THREE.Texture },
    uMouseSmoothed: { value: new THREE.Vector2(0.5, 0.5) },
    uTime:          { value: 0 },
    uHoverStrength: { value: 0 },
    uAspect:        { value: new THREE.Vector2(size.width / size.height, 1.0) },
  });

  // Swap in real textures once loaded
  useEffect(() => {
    if (!textures) return;
    uniforms.current.uPhoto.value = textures[0];
    uniforms.current.uBlueprint.value = textures[1];
    // Force material to update
    if (materialRef.current) materialRef.current.needsUpdate = true;
  }, [textures]);

  // Resize plane to fill the perspective camera frustum
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    uniforms.current.uAspect.value.set(size.width / size.height, 1.0);

    // For perspective camera, calc the visible height at z=0
    const cam = camera as THREE.PerspectiveCamera;
    if (cam.fov) {
      const vFov = (cam.fov * Math.PI) / 180;
      const planeH = 2 * Math.tan(vFov / 2) * cam.position.z;
      const planeW = planeH * (size.width / size.height);
      mesh.scale.set(planeW, planeH, 1);
    }
  }, [size, camera]);

  useFrame((_, delta) => {
    const u = uniforms.current;
    u.uTime.value += delta;

    // Ease hover strength
    const targetHover = isHoveringRef.current ? 1.0 : 0.0;
    hoverStrRef.current += (targetHover - hoverStrRef.current) * 0.05;
    u.uHoverStrength.value = hoverStrRef.current;

    // Spring-smooth mouse
    const raw = mouseRef.current;
    const sm  = smoothMouseRef.current;
    sm.x += (raw.x - sm.x) * SPRING;
    sm.y += (raw.y - sm.y) * SPRING;
    u.uMouseSmoothed.value.set(sm.x, sm.y);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}
