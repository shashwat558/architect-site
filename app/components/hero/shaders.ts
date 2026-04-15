/**
 * Hero WebGL Shaders — Simplified & Reliable
 *
 * Default state:
 *   - contructed.jpg is shown fully, slightly desaturated/darkened for mood
 *
 * On hover:
 *   - A smooth, organic blob follows the cursor with spring lag
 *   - Inside the blob: blueprint.png is revealed
 *   - The blob edge has a soft glow and contour line ring
 *   - Outside the blob: photo remains with subtle noise distortion
 *
 * The blob shape is made organic by displacing a circle with layered Simplex noise.
 */

export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  uniform sampler2D uPhoto;         // contructed.jpg
  uniform sampler2D uBlueprint;     // blueprint.png
  uniform vec2 uMouseSmoothed;      // spring-smoothed cursor in UV [0..1]
  uniform float uTime;              // elapsed seconds
  uniform float uHoverStrength;     // 0..1 eased in/out
  uniform vec2 uAspect;            // (width/height, 1.0) for correct circle

  varying vec2 vUv;

  // ── Simplex noise (compact implementation) ──────────────────────────────────
  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314*(a0*a0+h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // ── Organic blob mask ────────────────────────────────────────────────────────
  // Returns 0..1 where 1 = fully inside the blob
  float blobMask(vec2 uv, vec2 center, float radius) {
    // Aspect-correct distance so the blob is a circle, not ellipse
    vec2 delta = (uv - center) * vec2(uAspect.x, 1.0);

    // Layer 1: slow large warp (breathing)
    float n1 = snoise(uv * 2.8 + uTime * 0.22) * 0.10;
    // Layer 2: faster medium warp (organic edge jitter)
    float n2 = snoise(uv * 5.5 + uTime * 0.45 + vec2(3.7, 1.2)) * 0.045;
    // Layer 3: high-freq micro-crinkle
    float n3 = snoise(uv * 11.0 - uTime * 0.3 + vec2(8.1, 5.3)) * 0.018;

    float warpedRadius = radius + n1 + n2 + n3;

    float dist = length(delta);

    // Smooth edge — feather = 8% of blob radius
    float feather = warpedRadius * 0.18;
    return 1.0 - smoothstep(warpedRadius - feather, warpedRadius + feather, dist);
  }

  // ── Contour ring pulse ────────────────────────────────────────────────────
  float contourRing(vec2 uv, vec2 center, float radius) {
    vec2 delta = (uv - center) * vec2(uAspect.x, 1.0);
    float dist = length(delta);
    // Pulsing ring at the blob boundary
    float ring = abs(dist - radius) / (radius * 0.06);
    ring = 1.0 - smoothstep(0.0, 1.0, ring);
    // Animate ring brightness
    float pulse = 0.5 + 0.5 * sin(uTime * 2.4);
    return ring * (0.6 + 0.4 * pulse);
  }

  // ── Film grain ───────────────────────────────────────────────────────────
  float grain(vec2 uv, float t) {
    return fract(sin(dot(uv * 800.0 + t, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
  }

  void main() {
    vec2 uv = vUv;

    // ── Sample base photo ────────────────────────────────────────────────────
    // Tiny ambient drift so the image always feels alive
    float ambientDrift = 0.0015;
    float dx = snoise(uv * 3.0 + uTime * 0.12) * ambientDrift;
    float dy = snoise(uv * 3.0 + vec2(5.2, 1.3) + uTime * 0.10) * ambientDrift;
    vec4 photo = texture2D(uPhoto, clamp(uv + vec2(dx, dy), 0.001, 0.999));

    // Desaturate photo slightly for editorial feel
    float luma = dot(photo.rgb, vec3(0.299, 0.587, 0.114));
    photo.rgb = mix(photo.rgb, vec3(luma), 0.18);

    // ── Sample blueprint ──────────────────────────────────────────────────────
    // Blueprint has a slight additional warp inside the blob for depth
    float bx = snoise(uv * 4.0 + uTime * 0.08) * 0.006;
    float by = snoise(uv * 4.0 + vec2(2.1, 7.4) + uTime * 0.08) * 0.006;
    vec4 bp   = texture2D(uBlueprint, clamp(uv + vec2(bx, by), 0.001, 0.999));

    // Tone the blueprint: keep it slightly cool and slightly brighter
    float bpLuma = dot(bp.rgb, vec3(0.299, 0.587, 0.114));
    // Preserve colour but boost contrast slightly
    bp.rgb = mix(bp.rgb, vec3(bpLuma), -0.1); // slight saturation boost
    bp.rgb *= 1.08; // slight brightness lift

    // ── Blob reveal mask ─────────────────────────────────────────────────────
    float blobRadius = 0.22; // radius as fraction of height
    float mask = blobMask(uv, uMouseSmoothed, blobRadius) * uHoverStrength;

    // ── Contour ring at blob edge ─────────────────────────────────────────
    float ring  = contourRing(uv, uMouseSmoothed, blobRadius) * uHoverStrength;
    vec3 ringColor = vec3(0.65, 0.80, 1.0); // cool blue architectural line

    // ── Compose layers ───────────────────────────────────────────────────────
    // Mix photo (default) → blueprint (inside blob)
    vec3 color = mix(photo.rgb, bp.rgb, mask);

    // Add contour ring highlight on top
    color = mix(color, ringColor, ring * 0.55);

    // ── Film grain ────────────────────────────────────────────────────────────
    float g = grain(uv, uTime * 0.5) * 0.028;
    color += g;

    // ── Vignette ─────────────────────────────────────────────────────────────
    float vig = smoothstep(1.0, 0.35, length((uv - 0.5) * 1.3));
    color = mix(color * 0.55, color, vig);

    gl_FragColor = vec4(color, 1.0);
  }
`;
