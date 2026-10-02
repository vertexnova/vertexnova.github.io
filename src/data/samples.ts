export interface Sample {
  /** Curriculum number as a zero-padded string, e.g. "01". */
  number: string;
  slug: string;
  /** vnerhi sample folder / WASM basename, e.g. "01_triangle". */
  target: string;
  title: string;
  description: string;
}

export interface SampleGroup {
  id: string;
  label: string;
  samples: Sample[];
}

/**
 * Catalog mirrors vnerhi/samples/README.md curriculum order (00–48).
 * Availability is computed at build time from public/wasm/<target>.html.
 */
export const SAMPLE_GROUPS: SampleGroup[] = [
  // ── Foundations 00–06 ──────────────────────────────────────────────────
  {
    id: 'foundations',
    label: 'Foundations',
    samples: [
      {
        number: '00',
        slug: 'window',
        target: '00_window',
        title: 'Window',
        description: 'Surface and swapchain; clears a frame with no geometry.',
      },
      {
        number: '01',
        slug: 'triangle',
        target: '01_triangle',
        title: 'Triangle',
        description: 'Graphics pipeline, WGSL shaders, and a static vertex buffer.',
      },
      {
        number: '02',
        slug: 'cube',
        target: '02_cube',
        title: 'Cube',
        description: 'Indexed draw with depth buffer, uniform MVP, and per-face colors.',
      },
      {
        number: '03',
        slug: 'two-cubes',
        target: '03_two_cubes',
        title: 'Two Cubes',
        description: 'Multiple draw calls in one pass with dynamic uniform offsets.',
      },
      {
        number: '04',
        slug: 'fractal-cube',
        target: '04_fractal_cube',
        title: 'Fractal Cube',
        description: 'Procedural fragment shading written to an offscreen texture each frame.',
      },
      {
        number: '05',
        slug: 'msaa',
        target: '05_msaa',
        title: 'MSAA',
        description: '4× multisampled attachments resolved to the swapchain.',
      },
      {
        number: '06',
        slug: 'instancing',
        target: '06_instancing',
        title: 'Instancing',
        description: 'Single instanced draw with per-instance transform attributes.',
      },
    ],
  },

  // ── UI 07–08 ───────────────────────────────────────────────────────────
  {
    id: 'ui',
    label: 'UI',
    samples: [
      {
        number: '07',
        slug: 'imgui-overlay',
        target: '07_imgui_overlay',
        title: 'ImGui Overlay',
        description: 'Dear ImGui composited as a transparent overlay on the 3D pass.',
      },
      {
        number: '08',
        slug: 'imgui-panel',
        target: '08_imgui_panel',
        title: 'ImGui Panel',
        description: 'Docked ImGui layout with multi-viewport and texture registry.',
      },
    ],
  },

  // ── Textures 09–12 ─────────────────────────────────────────────────────
  {
    id: 'textures',
    label: 'Textures',
    samples: [
      {
        number: '09',
        slug: 'texturing',
        target: '09_texturing',
        title: 'Texturing',
        description: 'Sampled 2D image bound with a combined texture–sampler descriptor.',
      },
      {
        number: '10',
        slug: 'sampler-parameters',
        target: '10_sampler_parameters',
        title: 'Sampler Parameters',
        description: 'Filter, address mode, and anisotropy compared interactively.',
      },
      {
        number: '11',
        slug: 'texture-mipmap',
        target: '11_texture_mipmap',
        title: 'Texture Mipmap',
        description: 'Mip-chain generation and LOD bias for minification filtering.',
      },
      {
        number: '12',
        slug: 'cubemap',
        target: '12_cubemap',
        title: 'Cubemap',
        description: 'Cube texture sampling for skybox and environment lookup.',
      },
    ],
  },

  // ── Lighting & camera 13–14 ────────────────────────────────────────────
  {
    id: 'lighting-camera',
    label: 'Lighting & Camera',
    samples: [
      {
        number: '13',
        slug: 'lighting',
        target: '13_lighting',
        title: 'Lighting',
        description: 'Per-fragment Blinn–Phong over a textured mesh.',
      },
      {
        number: '14',
        slug: 'camera-controller',
        target: '14_camera_controller',
        title: 'Camera Controller',
        description: 'Orbit, pan, and zoom camera over a lit scene.',
      },
    ],
  },

  // ── Mesh & compute 15–18 ───────────────────────────────────────────────
  {
    id: 'mesh-compute',
    label: 'Mesh & Compute',
    samples: [
      {
        number: '15',
        slug: 'teapot',
        target: '15_teapot',
        title: 'Teapot',
        description: 'Mesh asset load with indexed draws and smooth vertex normals.',
      },
      {
        number: '16',
        slug: 'compute',
        target: '16_compute',
        title: 'Compute',
        description: 'Compute shader writing results into a storage texture.',
      },
      {
        number: '17',
        slug: 'compute-to-render',
        target: '17_compute_to_render',
        title: 'Compute to Render',
        description: 'Compute→graphics handoff: simulate then draw in the same frame.',
      },
      {
        number: '18',
        slug: 'metaballs',
        target: '18_metaballs',
        title: 'Metaballs',
        description: 'GPU marching cubes; geometry generated from a scalar field.',
      },
    ],
  },

  // ── Mesh & compute together 19–21 ──────────────────────────────────────
  {
    id: 'mesh-compute-together',
    label: 'Mesh & Compute Together',
    samples: [
      {
        number: '19',
        slug: 'teapot-normals',
        target: '19_teapot_normals',
        title: 'Teapot Normals',
        description: 'Compute-built normal lines overlaid on a loaded mesh.',
      },
      {
        number: '20',
        slug: 'wireframe',
        target: '20_wireframe',
        title: 'Wireframe',
        description: 'Barycentric wireframe overlay from a compute pass.',
      },
      {
        number: '21',
        slug: 'pbr-material',
        target: '21_pbr_material',
        title: 'PBR Material',
        description: 'Metallic–roughness PBR with Fresnel and image-based lighting.',
      },
    ],
  },

  // ── Surface detail & shadows 22–26 ─────────────────────────────────────
  {
    id: 'surface-shadows',
    label: 'Surface Detail & Shadows',
    samples: [
      {
        number: '22',
        slug: 'normal-mapping',
        target: '22_normal_mapping',
        title: 'Normal Mapping',
        description: 'Tangent-space normal, parallax, and steep parallax mapping.',
      },
      {
        number: '23',
        slug: 'environment-mapping',
        target: '23_environment_mapping',
        title: 'Environment Mapping',
        description: 'Diffuse and specular IBL from a cubemap probe.',
      },
      {
        number: '24',
        slug: 'reflection',
        target: '24_reflection',
        title: 'Reflection',
        description: 'Cubemap reflections sampled on a reflective mesh.',
      },
      {
        number: '25',
        slug: 'hdr',
        target: '25_hdr',
        title: 'HDR & Tone Mapping',
        description: 'Float16 render target with Reinhard and ACES tone maps.',
      },
      {
        number: '26',
        slug: 'shadow-mapping',
        target: '26_shadow_mapping',
        title: 'Shadow Mapping',
        description: 'Directional depth-only shadow map with PCF filtering.',
      },
    ],
  },

  // ── Depth & render state 27–30 ─────────────────────────────────────────
  {
    id: 'depth-state',
    label: 'Depth & Render State',
    samples: [
      {
        number: '27',
        slug: 'depth-precision',
        target: '27_depth_precision',
        title: 'Depth Precision',
        description: 'Reverse-Z versus conventional depth; z-fighting visualization.',
      },
      {
        number: '28',
        slug: 'stencil-testing',
        target: '28_stencil_testing',
        title: 'Stencil Testing',
        description: 'Stencil ops for outlining and masked multi-pass rendering.',
      },
      {
        number: '29',
        slug: 'blending',
        target: '29_blending',
        title: 'Blending',
        description: 'Blend factors, ops, and Porter–Duff presets for transparency.',
      },
      {
        number: '30',
        slug: 'deferred-shading',
        target: '30_deferred_shading',
        title: 'Deferred Shading',
        description: 'MRT G-buffer (position, normal, albedo) plus lighting resolve.',
      },
    ],
  },

  // ── Order-independent transparency 31–33 ──────────────────────────────
  {
    id: 'oit',
    label: 'Transparency (OIT)',
    samples: [
      {
        number: '31',
        slug: 'oit-abuffer',
        target: '31_oit_abuffer',
        title: 'OIT — A-Buffer',
        description: 'Per-pixel linked-list A-buffer with atomics and storage buffers.',
      },
      {
        number: '32',
        slug: 'oit-dual-depth',
        target: '32_oit_dual_depth_peeling',
        title: 'OIT — Dual Depth Peeling',
        description: 'Multi-pass dual depth peeling of front and back transparent layers.',
      },
      {
        number: '33',
        slug: 'oit-weighted',
        target: '33_oit_weighted_blended',
        title: 'OIT — Weighted Blended',
        description: 'Single-pass weighted blended OIT approximation.',
      },
    ],
  },

  // ── Annotation primitives 34–37 ────────────────────────────────────────
  {
    id: 'annotation',
    label: 'Annotation Primitives',
    samples: [
      {
        number: '34',
        slug: 'line-rendering',
        target: '34_line_rendering',
        title: 'Line Rendering',
        description: 'Screen-space thick lines with configurable width and AA.',
      },
      {
        number: '35',
        slug: 'point-rendering',
        target: '35_point_rendering',
        title: 'Point Rendering',
        description: 'Point sprites with per-point color and size attributes.',
      },
      {
        number: '36',
        slug: 'text-rendering',
        target: '36_text_rendering',
        title: 'Text Rendering',
        description: 'SDF glyph-atlas text; resolution-independent sizing.',
      },
      {
        number: '37',
        slug: 'picking',
        target: '37_picking',
        title: 'GPU Picking',
        description: 'Offscreen object-ID pass with GPU readback for hit testing.',
      },
    ],
  },

  // ── Volume 38–40 ───────────────────────────────────────────────────────
  {
    id: 'volume',
    label: 'Volume',
    samples: [
      {
        number: '38',
        slug: 'volume-rendering',
        target: '38_volume_rendering',
        title: 'Volume Rendering',
        description: '3D texture raymarching with a configurable transfer function.',
      },
      {
        number: '39',
        slug: 'volume-windowing',
        target: '39_volume_windowing',
        title: 'Volume Windowing',
        description: 'Window/level LUT over volumetric intensity (DICOM-style).',
      },
      {
        number: '40',
        slug: 'slice-rendering',
        target: '40_slice_rendering',
        title: 'Slice Rendering',
        description: 'Axial, sagittal, and coronal MPR slice planes.',
      },
    ],
  },

  // ── Tooling & viewers 41–43 ────────────────────────────────────────────
  {
    id: 'viewers',
    label: 'Tooling & Viewers',
    samples: [
      {
        number: '41',
        slug: 'gpu-debug',
        target: '41_gpu_debug',
        title: 'GPU Debug',
        description: 'Debug markers, GPU timers, and WebGPU validation scopes.',
      },
      {
        number: '42',
        slug: 'gltf-viewer',
        target: '42_gltf_viewer',
        title: 'glTF Viewer',
        description: 'glTF 2.0 scene graph with per-material PBR rendering.',
      },
      {
        number: '43',
        slug: 'usd-viewer',
        target: '43_usd_viewer',
        title: 'USD Viewer',
        description: 'USD stage load with materials, joints, and camera controls.',
      },
    ],
  },

  // ── Advanced 44–48 ─────────────────────────────────────────────────────
  {
    id: 'advanced',
    label: 'Advanced',
    samples: [
      {
        number: '44',
        slug: 'push-constants',
        target: '44_push_constants',
        title: 'Push Constants',
        description: 'Per-draw push constants for small, high-frequency uniforms.',
      },
      {
        number: '45',
        slug: 'multithreading',
        target: '45_multithreading',
        title: 'Multithreading',
        description: 'Multi-encoder render-pass recording across worker threads.',
      },
      {
        number: '46',
        slug: 'multithreaded-picking',
        target: '46_multithreaded_picking',
        title: 'Multithreaded Picking',
        description: 'Worker-recorded draws; pick pass stays on the frame thread.',
      },
      {
        number: '47',
        slug: 'offscreen-worker',
        target: '47_offscreen_worker',
        title: 'Offscreen Worker',
        description: 'Host pumps input; render pthread owns the OffscreenCanvas GPU.',
      },
      {
        number: '48',
        slug: 'render-bundles',
        target: '48_render_bundles',
        title: 'Render Bundles',
        description: 'Pre-recorded render bundles to cut per-frame CPU encode cost.',
      },
    ],
  },
];

export function getAllSamples(): Sample[] {
  return SAMPLE_GROUPS.flatMap((g) => g.samples);
}

export function findSample(slug: string): Sample | undefined {
  return getAllSamples().find((s) => s.slug === slug);
}

export const DEFAULT_SAMPLE_SLUG = 'triangle';
