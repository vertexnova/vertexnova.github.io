# VertexNova WebGPU Samples

Interactive WebGPU samples from the [vnerhi](https://github.com/vertexnova/vnerhi) rendering engine.

**Live site:** https://vertexnova.github.io/

Open the site, pick a sample from the list, and it runs in the browser. Use ← / → to move through the curriculum, or search to filter.

If something does not start, check [browser support](https://vertexnova.github.io/support/).

## Platforms & backends

Every sample in [vnerhi](https://github.com/vertexnova/vnerhi) targets the same curriculum across platforms:

| Platform | Metal | Vulkan | WebGPU |
|----------|:-----:|:------:|:------:|
| macOS | ✓ | ✓ (MoltenVK) | ✓ |
| Windows | — | ✓ | ✓ |
| Linux | — | ✓ | ✓ |
| iOS / iPadOS | ✓ | — | — |
| Android / tablet | — | ✓ | — |
| Web (this site) | — | — | ✓ |

This site hosts the **WebGPU** (WASM) builds for the browser.

### WebGPU in browsers

Status follows the [WebGPU Implementation Status](https://github.com/gpuweb/gpuweb/wiki/Implementation-Status) wiki and [Chrome WebGPU overview](https://developer.chrome.com/docs/web-platform/webgpu/overview).

| Browser | Windows | macOS | Linux | Android | iOS / iPadOS |
|---------|---------|-------|-------|---------|--------------|
| Chrome / Chromium | **113+** | **113+** | **144+**\* | **121+**† | —‡ |
| Microsoft Edge | **113+** | **113+** | **144+**\* | **121+**† | —‡ |
| Safari | — | **26+** | — | — | **26+** |
| Firefox | **141+** | **145+**§ | **Flag**¶ | —¶ | — |

\* Linux: Intel Gen12+ from **144+**; NVIDIA Wayland often **147+**. Other GPUs may need flags — see the [implementation status](https://github.com/gpuweb/gpuweb/wiki/Implementation-Status). Edge is available on supported Linux distros ([Microsoft Learn](https://learn.microsoft.com/en-us/DeployEdge/microsoft-edge-supported-operating-systems)).  
† Android **12+** with supported GPUs (Qualcomm / ARM / Intel; expanding). Check `chrome://gpu` if a sample fails.  
‡ iPhone / iPad: Safari **26+** only. Chrome and Edge are not supported for these samples.  
§ Apple Silicon from **145+**; broader macOS from **147+**.  
¶ Firefox on Linux works when WebGPU is enabled in `about:config` (`dom.webgpu.enabled` = **true**). Android remains experimental / Nightly in many builds.

More detail: [browser support](https://vertexnova.github.io/support/).



## Samples

Curriculum order (`00`–`48`). Source: [vnerhi/samples](https://github.com/vertexnova/vnerhi/tree/main/samples).

### Foundations
- `00` Window
- `01` Triangle
- `02` Cube
- `03` Two Cubes
- `04` Fractal Cube
- `05` MSAA
- `06` Instancing

### UI
- `07` ImGui Overlay
- `08` ImGui Panel

### Textures
- `09` Texturing
- `10` Sampler Parameters
- `11` Texture Mipmap
- `12` Cubemap

### Lighting & Camera
- `13` Lighting
- `14` Camera Controller

### Mesh & Compute
- `15` Teapot
- `16` Compute
- `17` Compute to Render
- `18` Metaballs

### Mesh & Compute Together
- `19` Teapot Normals
- `20` Wireframe
- `21` PBR Material

### Surface Detail & Shadows
- `22` Normal Mapping
- `23` Environment Mapping
- `24` Reflection
- `25` HDR & Tone Mapping
- `26` Shadow Mapping

### Depth & Render State
- `27` Depth Precision
- `28` Stencil Testing
- `29` Blending
- `30` Deferred Shading

### Transparency (OIT)
- `31` OIT — A-Buffer
- `32` OIT — Dual Depth Peeling
- `33` OIT — Weighted Blended

### Annotation Primitives
- `34` Line Rendering
- `35` Point Rendering
- `36` Text Rendering
- `37` GPU Picking

### Volume
- `38` Volume Rendering
- `39` Volume Windowing
- `40` Slice Rendering

### Tooling & Viewers
- `41` GPU Debug
- `42` glTF Viewer
- `43` USD Viewer — desktop only (not available in the browser)

### Advanced
- `44` Push Constants
- `45` Multithreading
- `46` Multithreaded Picking
- `47` Offscreen Worker
- `48` Render Bundles

## Report a bug

1. Open the sample that fails.
2. Click **Report** in the sample toolbar (or use [this form](https://github.com/vertexnova/vertexnova.github.io/issues/new?template=webgpu-sample-bug.yml)).
3. Include browser, OS, and GPU if you can, plus any console errors (F12 → Console).
