export interface Sample {
  slug: string;
  target: string;
  title: string;
  description: string;
}

export interface SampleGroup {
  id: string;
  label: string;
  samples: Sample[];
}

export const SAMPLE_GROUPS: SampleGroup[] = [
  // ── 1. Basics ──────────────────────────────────────────────────────────
  {
    id: 'basics',
    label: 'Basics',
    samples: [
      {
        slug: 'window',
        target: '00_window',
        title: 'Window',
        description: 'Creating a cross-platform window and WebGPU surface — the foundation every other sample builds on.',
      },
      {
        slug: 'triangle',
        target: '01_triangle',
        title: 'Triangle',
        description: 'The classic first step: a colored triangle rendered with a vertex and fragment shader using a hard-coded vertex buffer.',
      },
      {
        slug: 'cube',
        target: '02_cube',
        title: 'Cube',
        description: 'A rotating 3D cube with per-face colors, demonstrating index buffers, uniform buffers, and a perspective projection matrix.',
      },
      {
        slug: 'msaa',
        target: '03_msaa',
        title: 'MSAA',
        description: 'Multisample anti-aliasing — resolving a 4× multisampled render target to smooth jagged triangle edges.',
      },
      {
        slug: 'two-cubes',
        target: '07_two_cubes',
        title: 'Two Cubes',
        description: 'Two independently transforming cubes sharing the same pipeline, demonstrating dynamic uniform buffer offsets.',
      },
      {
        slug: 'instancing',
        target: '08_instancing',
        title: 'Instancing',
        description: 'Drawing thousands of objects in a single draw call by supplying per-instance transform data in a vertex buffer.',
      },
    ],
  },

  // ── 2. GUI ─────────────────────────────────────────────────────────────
  {
    id: 'gui',
    label: 'GUI',
    samples: [
      {
        slug: 'imgui-overlay',
        target: '10_imgui_overlay',
        title: 'ImGui Overlay',
        description: 'Integrating Dear ImGui as a debug overlay rendered on top of the 3D scene each frame.',
      },
      {
        slug: 'imgui-panel',
        target: '11_imgui_panel',
        title: 'ImGui Panel',
        description: 'Full-window ImGui panel mode — building interactive parameter editors and debug UIs.',
      },
    ],
  },

  // ── 3. Compute ─────────────────────────────────────────────────────────
  {
    id: 'compute',
    label: 'Compute',
    samples: [
      {
        slug: 'compute',
        target: '19_compute',
        title: 'Compute',
        description: 'A minimal compute shader that writes results into a storage buffer — the "hello world" of WebGPU compute.',
      },
      {
        slug: 'compute-to-render',
        target: '20_compute_to_render',
        title: 'Compute to Render',
        description: 'Particle system: positions integrated by a compute pass each frame and rendered as instanced quads.',
      },
    ],
  },

  // ── 4. Texturing ───────────────────────────────────────────────────────
  {
    id: 'texturing',
    label: 'Texturing',
    samples: [
      {
        slug: 'texturing',
        target: '04_texturing',
        title: 'Texturing',
        description: 'Loading a 2D texture from disk and sampling it with UV coordinates using a combined texture-sampler descriptor.',
      },
      {
        slug: 'fractal-cube',
        target: '05_fractal_cube',
        title: 'Fractal Cube',
        description: 'Rendering a procedural Mandelbrot fractal to an off-screen texture each frame, then mapping it onto a rotating cube.',
      },
      {
        slug: 'cubemap',
        target: '06_cubemap',
        title: 'Cubemap',
        description: 'Sampling a cube-map texture for a skybox and environment reflections, showing the cube-map coordinate system.',
      },
      {
        slug: 'texture-mipmap',
        target: '18_texture_mipmap',
        title: 'Texture Mipmap',
        description: 'Manual mip-map generation and LOD bias — how mipmapping eliminates aliasing on distant or angled surfaces.',
      },
      {
        slug: 'sampler-parameters',
        target: '15_sampler_parameters',
        title: 'Sampler Parameters',
        description: 'Interactive exploration of wrap modes (repeat, clamp, mirror) and filter modes (nearest, linear, anisotropic).',
      },
    ],
  },

  // ── 5. Asset Loading ───────────────────────────────────────────────────
  {
    id: 'assets',
    label: 'Asset Loading',
    samples: [
      {
        slug: 'teapot',
        target: '09_teapot',
        title: 'Teapot',
        description: 'The Utah Teapot with smooth per-vertex normals — a classic mesh test with indexed draws and a depth buffer.',
      },
      {
        slug: 'teapot-normals',
        target: '21_teapot_normals',
        title: 'Teapot Normals',
        description: 'Visualising per-vertex and per-face normals on the teapot using geometry-shader-free line rendering.',
      },
    ],
  },

  // ── 6. Lighting & Materials ────────────────────────────────────────────
  {
    id: 'lighting',
    label: 'Lighting & Materials',
    samples: [
      {
        slug: 'lighting',
        target: '12_lighting',
        title: 'Lighting',
        description: 'Phong shading with ambient, diffuse, and specular components computed per-fragment in a WGSL shader.',
      },
      {
        slug: 'camera-controller',
        target: '13_camera_controller',
        title: 'Camera Controller',
        description: 'Orbit, pan, and zoom camera with perspective projection — the standard arcball interaction model.',
      },
      {
        slug: 'depth-precision',
        target: '14_depth_precision',
        title: 'Depth Precision',
        description: 'Visualising depth buffer precision artifacts and the impact of near/far plane placement on z-fighting.',
      },
      {
        slug: 'stencil-testing',
        target: '16_stencil_testing',
        title: 'Stencil Testing',
        description: 'Using the stencil buffer for object outlining and masked rendering — two-pass technique without geometry shaders.',
      },
      {
        slug: 'blending',
        target: '17_blending',
        title: 'Blending',
        description: 'Alpha blending modes: additive, premultiplied alpha, and sorted back-to-front transparency.',
      },
      {
        slug: 'pbr-material',
        target: '23_pbr_material',
        title: 'PBR Material',
        description: 'Physically-based rendering with the metallic–roughness workflow, Fresnel reflectance, and image-based lighting.',
      },
      {
        slug: 'normal-mapping',
        target: '24_normal_mapping',
        title: 'Normal Mapping',
        description: 'Per-pixel surface detail using a tangent-space normal map for high-frequency lighting without extra geometry.',
      },
    ],
  },

  // ── 7. Debugging ───────────────────────────────────────────────────────
  {
    id: 'debugging',
    label: 'Debugging',
    samples: [
      {
        slug: 'gpu-debug',
        target: '28_gpu_debug',
        title: 'GPU Debug',
        description: 'Using WebGPU error scopes, debug labels on resources, and push/pop error scope for GPU debugging.',
      },
      {
        slug: 'wireframe',
        target: '22_wireframe',
        title: 'Wireframe',
        description: 'Barycentric-coordinate wireframe overlay in a single pass — no geometry shader, works on any mesh.',
      },
    ],
  },

  // ── 8. Advanced Rendering ──────────────────────────────────────────────
  {
    id: 'advanced',
    label: 'Advanced Rendering',
    samples: [
      {
        slug: 'shadow-mapping',
        target: '25_shadow_mapping',
        title: 'Shadow Mapping',
        description: 'Single-directional shadow map with a depth-only pass and PCF filtering to soften shadow edges.',
      },
      {
        slug: 'deferred-shading',
        target: '26_deferred_shading',
        title: 'Deferred Shading',
        description: 'G-buffer pass writing position, normal, and albedo; lighting resolved in a screen-space fullscreen pass.',
      },
      {
        slug: 'hdr',
        target: '27_hdr',
        title: 'HDR & Tone Mapping',
        description: 'High dynamic range rendering with a float16 render target, Reinhard and ACES filmic tone mapping operators.',
      },
      {
        slug: 'line-rendering',
        target: '31_line_rendering',
        title: 'Line Rendering',
        description: 'Screen-space thick line rendering with configurable width and anti-aliased edges — no geometry shader required.',
      },
      {
        slug: 'text-rendering',
        target: '32_text_rendering',
        title: 'Text Rendering',
        description: 'SDF-based text rendering with configurable size, color, and softness — crisp at any resolution or scale.',
      },
    ],
  },

  // ── 9. Medical / Volume ────────────────────────────────────────────────
  {
    id: 'medical',
    label: 'Medical / Volume',
    samples: [
      {
        slug: 'volume-rendering',
        target: '33_volume_rendering',
        title: 'Volume Rendering',
        description: 'Ray-marched volumetric rendering of medical imaging data (CT/MRI) with a configurable transfer function.',
      },
      {
        slug: 'volume-windowing',
        target: '34_volume_windowing',
        title: 'Volume Windowing',
        description: 'DICOM-style windowing controls (center / width) for adjusting the displayed Hounsfield intensity range.',
      },
      {
        slug: 'slice-rendering',
        target: '36_slice_rendering',
        title: 'Slice Rendering',
        description: 'Interactive axial, sagittal, and coronal slicing of volumetric data with an adjustable slice plane.',
      },
      {
        slug: 'picking',
        target: '35_picking',
        title: 'GPU Picking',
        description: 'Object selection using a GPU readback of an object-ID render target — no CPU ray casting needed.',
      },
      {
        slug: 'point-rendering',
        target: '37_point_rendering',
        title: 'Point Rendering',
        description: 'Rendering large point clouds with per-point color and size attributes using instanced geometry.',
      },
    ],
  },

  // ── 10. Transparency (OIT) ─────────────────────────────────────────────
  {
    id: 'oit',
    label: 'Transparency (OIT)',
    samples: [
      {
        slug: 'oit-abuffer',
        target: '38_oit_abuffer',
        title: 'OIT — A-Buffer',
        description: 'Per-pixel linked-list order-independent transparency using atomic operations and a GPU storage buffer.',
      },
      {
        slug: 'oit-dual-depth',
        target: '39_oit_dual_depth_peeling',
        title: 'OIT — Dual Depth Peeling',
        description: 'Multi-pass dual depth peeling — peels front and back transparent layers simultaneously for correct blending.',
      },
      {
        slug: 'oit-weighted',
        target: '40_oit_weighted_blended',
        title: 'OIT — Weighted Blended',
        description: 'Weighted blended OIT: a single-pass approximation fast enough for real-time transparent geometry.',
      },
    ],
  },

  // ── 11. glTF Viewer ────────────────────────────────────────────────────
  {
    id: 'gltf',
    label: 'glTF Viewer',
    samples: [
      {
        slug: 'gltf-viewer',
        target: '43_gltf_viewer',
        title: 'glTF Viewer',
        description: 'Load and render glTF 2.0 scenes with PBR materials, multiple meshes, and a full scene-node hierarchy.',
      },
    ],
  },
];

export function getAllSamples(): Sample[] {
  return SAMPLE_GROUPS.flatMap(g => g.samples);
}

export function findSample(slug: string): Sample | undefined {
  return getAllSamples().find(s => s.slug === slug);
}

export const DEFAULT_SAMPLE_SLUG = 'triangle';
