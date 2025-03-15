---
title: 'Docker Buildx Setup'
date: 2025-03-15
author: Andrew M McCall
description: Quick notes on using docker buildx to build images
summary:  A getting started guide for docker buildx
publishDate: '2025-03-15T09:44:14-04:00'
updateDate:  '2025-03-15T09:44:14-04:00'
images: ['/images/twitter-card.png']
draft: false
categories:
  - Web Development
tags:
  - Docker
  - Docker Buildx
---

Read about the `BuildKit` at docker: [Docker BuildKit Overview](https://docs.docker.com/build/buildkit/ "Docker BuildKit Overview").

- not sure if we still need, but in `.bashrc`: `export DOCKER_BUILDKIT=1`
- `source .bashrc`
- `sudo pacman -S docker-buildx`
- `docker buildx install`
- `cd my-project/i-want-to-buld/with/dockerfile` 
- `docker buildx create --name nameofbuilder --bootstrap --platform
  linux/amd64,linux/arm64 --use`
- dockerfile can omit `--platform` directives
- view builder instances with `docker buildx ls`
- `docker buildx build --platform linux/amd64, linux/arm64 -t
  myregistry/myapp:latest --push .`


## confirm docker buildx is installed 

We can cat ~/.docker/config.json and look at the aliases section.  Do you
see `"builder": "buildx"`?

You can also run `docker buildx --help`.  If `buildx` is not installed, you
will get the regular docker help menu.  

If it is installed, you might get something like this:

```
❯ docker buildx --help
Extended build capabilities with BuildKit

Usage:  docker buildx [OPTIONS] COMMAND

Extended build capabilities with BuildKit

Options:
      --builder string   Override the configured builder instance
  -D, --debug            Enable debug logging

Management Commands:
  history     Commands to work on build records
  imagetools  Commands to work on images in registry

Commands:
  bake        Build from a file
  build       Start a build
  create      Create a new builder instance
  dial-stdio  Proxy current stdio streams to builder instance
  du          Disk usage
  inspect     Inspect current builder instance
  ls          List builder instances
  prune       Remove build cache
  rm          Remove one or more builder instances
  stop        Stop builder instance
  use         Set the current builder instance
  version     Show buildx version information

Run 'docker buildx COMMAND --help' for more information on a command.

Experimental commands and flags are hidden. Set BUILDX_EXPERIMENTAL=1 to show them.
```

Want to read about the legacy docker builder?  I have a cheatsheet of
helpful commands here: [Docker Important Topics &
Notes](/blog/2025/03/notes-on-docker/ "docker cheatsheet and common
commands").

Until next time, enjoy your docker journey.  


