---
title: Installing gsplat on DGX Spark (ARM64)
date: Apr 24, 2026
tags: [gsplat, ARM64, PyTorch, 3DGS]
status: complete
description: Build gsplat from source inside a GPU container on GB10 — PyTorch 2.7, CUDA 13, and the SM 12.0 architecture flag that trips first-time builds.
---

## Purpose

Install **gsplat** in an environment that matches this hardware: **ARM64**, **CUDA 13**, and **Blackwell-class** GPUs. Expect to build from source; wheels are often missing for this combination.

## What you will have when done

- A container (or image) where `import gsplat` and a minimal CUDA tensor op succeed
- A written record of the **exact** `TORCH_CUDA_ARCH_LIST` (or equivalent) you used
- A known-good pairing of **PyTorch** and **gsplat** versions for your lab notes

## Outline

1. **Start from an NVIDIA PyTorch base** that already matches CUDA on the host.
2. **Install build deps** inside the container (compiler, headers), not on the host.
3. **Compile gsplat** with build isolation disabled if your tooling requires it (`--no-build-isolation` when appropriate).
4. **Verify** import, version string, and a one-line CUDA check.

## Key points

- Mismatch between **PyTorch CUDA** and **driver** is the most common failure mode — align versions before debugging gsplat itself.
- **Architecture flags** must include your GPU’s compute capability; an overly narrow list produces opaque link errors.
- Keep logs of **pip and compiler output** the first time you succeed; they are worth more than generic install docs for this machine class.

## Checklist

- [ ] Base image version recorded (NGC tag or digest)
- [ ] `python -c "import torch; print(torch.__version__, torch.cuda.is_available())"` passes
- [ ] `python -c "import gsplat; print(gsplat.__version__)"` passes
- [ ] Notes updated with the exact install command sequence that worked

## Next step

When you need a broader Python stack (TensorFlow, OpenCV, multiple frameworks), follow the **AI/ML container** guide once it leaves “planned” status.
