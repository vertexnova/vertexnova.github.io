---
title: Building the full AI/ML container (PyTorch + TensorFlow + OpenCV)
date: Planned
tags: [PyTorch, TensorFlow, Keras, OpenCV]
status: draft
description: Planned image `ajeet/aiml-spark:v1` — one ARM64 + CUDA 13 container for general ML work, aligned with the same run flags as the gsplat workflow.
---

## Status

This guide is **planned**. It will document building **`ajeet/aiml-spark:v1`**: a general-purpose ML image for **ARM64** and **CUDA 13**, consistent with the Docker strategy guide.

## Intended outcomes

- Single long-lived image for **PyTorch**, **TensorFlow**, **Keras**, and **OpenCV** with versions that cooperate on this platform
- Same **run contract** as other Spark guides (GPUs, IPC, ulimits, workspace mount)
- A short **matrix** in the final doc: framework version × CUDA × Python

## Draft outline (for the full write-up)

1. Base image selection and rationale  
2. Layered Dockerfile versus iterative `commit` (when each is appropriate)  
3. Multi-framework install order to avoid shared library clashes  
4. Smoke tests per framework and a combined “hello stack” script  
5. Image size and cleanup notes (`docker system df`, prune policy)

## Placeholder checklist

- [ ] Dockerfile or build recipe checked into the repo you use for images
- [ ] CI or local script that rebuilds the image reproducibly
- [ ] Documented `docker run` line that matches your other Spark containers

## For now

Use the **gsplat** guide and the **Docker reference** until this page is marked complete.
