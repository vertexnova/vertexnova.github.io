---
title: DGX Spark — full dev environment setup
date: Apr 24, 2026
tags: [DGX Spark, Ubuntu 24.04, CUDA 13]
status: complete
description: Host configuration, workspace layout, and checks that the GPU stack is healthy before you install frameworks.
---

## Purpose

Prepare the DGX Spark host so later guides (Docker, gsplat) run on a known-good base. This page is written as short class notes you can skim before a session.

## What you will have when done

- Swap and resource limits aligned with NVIDIA guidance for this class of machine
- A single workspace directory on the host that you always mount into containers
- Confirmed driver, CUDA runtime visibility, and a repeatable sanity check

## Outline

1. **Host policy** — keep ML installs off the base OS; use containers for Python stacks.
2. **Disk and workspace** — one canonical tree (for example `~/workspace`) for repos, datasets, and outputs.
3. **Verification** — `nvidia-smi`, a minimal GPU container smoke test, and a note of driver and CUDA versions for your log.

## Key points

- Treat the OS image as **immutable** beyond drivers, Docker, and system tools.
- **Document** anything you change on the host (kernel params, ulimits, fstab) in one place so you can reproduce the machine later.
- Prefer **NVIDIA-provided** base images for GPU tests rather than ad hoc pip installs on the host.

## Checklist (copy into your notes)

- [ ] Workspace path exists and is backed up or under version control where it matters
- [ ] `nvidia-smi` shows the expected GPU and driver
- [ ] Docker can run a CUDA base image with `--gpus all`
- [ ] No heavy Python ML stack installed directly on the host

## Next step

Continue to **Docker container strategy** on this site, then use the **Docker command reference** while you work.
