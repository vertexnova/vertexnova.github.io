---
title: Docker container strategy for AI/ML on DGX Spark
date: Apr 24, 2026
tags: [Docker, NVIDIA containers, workflow]
status: complete
description: Naming, run flags, and a simple host-versus-container rule set so the base OS stays clean and experiments stay repeatable.
---

## Purpose

Define how you run AI/ML on the DGX Spark **without** polluting the host. These notes match how the rest of the setup guides assume you work.

## What you will have when done

- A **naming pattern** for long-lived dev containers versus throwaway runs
- A **standard `docker run` skeleton** (GPUs, IPC, ulimits, workspace mount) you reuse
- A clear rule for **what lives on the host** versus **inside the image**

## Outline

1. **Images and tags** — semantic tags for images you build (`purpose-spark:vN`).
2. **Run contract** — `--gpus all`, `--ipc=host`, ulimits, `-v ~/workspace:/workspace`, named `--name`.
3. **Lifecycle** — when to `commit`, when to rebuild from a Dockerfile, when to prune.

## Key points

- **Mount the workspace every time** so code and artifacts survive container removal.
- Use **`--name`** on anything you might `exec` or `commit` later.
- Keep **two layers**: thin host (drivers, Docker) and fat container (PyTorch, tooling).

## Checklist

- [ ] You can list running and stopped containers and explain what each is for
- [ ] Your default run line is saved somewhere (shell alias, snippet, or doc)
- [ ] You know which directories are **bind-mounted** versus **only in the container layer**

## Next step

Open the **Docker command reference** in another tab, then use **DGX Spark — container setup** for the full image build tabs when you need them. Continue to **gsplat install** when you are ready to compile on ARM64.
