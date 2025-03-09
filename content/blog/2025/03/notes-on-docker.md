---
title: 'Docker: Important Topics & Notes'
date: 2025-03-07
author: Andrew M McCall
description: 'Some basic docker commands for reference. My personal important topics and notes for Docker.'
summary:  'This is a repository of my notes and important topics on docker commands. Helpful for when I forget things.'
publishDate: '2025-03-07T19:31:54-05:00' 
updateDate:  '2025-03-09T19:31:54-05:00'
images: ['/images/twitter-card.png']
draft: false
categories:
  - Web Development
tags:
  - Docker
  - DevOps
 

---
## Basic Docker Commands
- start a docker container with image: `docker container run --publish 80:80 nginx` 
- detach mode: `docker container run --publish 80:80 nginx --detach`
- list docker containers: `docker container ls`
- stop docker container `docker container stop __container_id__`
- with name: `docker container run --publish 80:80 --detach --name webhost nginx`
- get logs: `docker container logs webhost`
- process running inside the container: `docker container top webhost`
- need to remove multiple at once: `docker container rm 63f 690 0de`
- force remove containers: `docker container rm -f CONTAINER_ID`
- passing env var: `docker container run -d -p 3306:3306 --name db -e
  MYSQL_ROOT_PASSWORD=yes mysql`

`Docker container run` first looks for the image locally in the image
cache.  If it doesn't find anything, it looks for it in the remote image
repository which defaults to Docker Hub. If not specified, it chooses the
latest, then creates a new container based on that image and prepares to
start.  It gives it a virtual IP on a private network inside of docker
engine.  It opens up port 80 on the host and forwards to port 80 on the
container.  
finally the container stars.


## What is a container?

It is not a virtual machine.  They are a process running on your host
operating system.  It is a restricted process inside our host operating
system and nothing like a virtual machine.  

- `docker run --name mongo -d mongo`
- `docker top mongo` - can see uid, pid, etc
- `ps aux | grep mongod` can show you that it is just a process running on
  the host machine

## See what is going on inside docker container
- docker container top
- docker container inspect
- docker container stats

`docker container run -d --name nginx nginx && docker container run -d
--name mysql -e MSQL_RANDOM_ROOT_PASSWORD=true mysql`a

- `docker container top mysql`
- `docker container inspect mysql`
- `docker container stats` - simple real time data

## Getting a shell inside of the container

- `docker container run -it` # starts new container interactively
- `docker container exec -it` # run additional command in existing -it
  interactive psuedo-tty
  container
- no ssh needed
- `docker container run -it --name proxy nginx bash`
- type `exit` to exit container
- in this instance, we stop the container when we exit the shell
- `docker container exec -it mariadb bash|/bin/sh` will let you run
  additional command and when you exit the container will still be running
- `docker pull alpine && docker container run -it alpine bash` will cause
  error because bash is not in the container, how would I get into the
  alpine image?  We can usebash is not in the container, how would I get
  into the alpine image?  We can use sh. `docker pull alpine && docker
  container run -it alpine /bin/sh`  `ctrl+d` to exit.

## Docker Networks: Overview

- `docker container run -p` - exposes the port on the host machine
- For local dev/testing, networks usually just work
- quick port check with `docker container port <container>`

- Each container connected to a private virtual network "bridge"
- Each virtual network routes through a NAT firewall on host IP
- all containers on a virtual network can talk to each other without -p
  (specific containers talk to each other on their own network)
- Best practice is to create a new virtual network for each app:
    - network "my_web_app" for mysql and php/apache containers
    - network "my_api" for mongo and nodejs containers


## Batteries Included, But Removable

- defaults work well in many caes, but easy to swap parts
- creating multiple virtual networks
- attach containers to more then one virtual network or none
- skip virtual network configuration and use host IP (--net=host)
- use different docker network drivers to gain new abilities

- `docker container run -p 80:80 --name webhost -d nginx`
- also can use `--publish`
- remember publishing ports is always in host:container format
- `docker container port webhost`

```
❯ docker container port webhost
80/tcp -> 0.0.0.0:80
80/tcp -> [::]:80
```

- `docker container inspect --format '{{ .NetworkSettings.IPAddress  }}' webhost`

```
❯ docker container inspect --format '{{ .NetworkSettings.IPAddress  }}' webhost
172.17.0.2
```
The firewall blocks incoming traffic by default, and docker container
traffic  are NAT'd. There is docker virtual networks that are called things
like `bridge/docker0` and the container attaches to the virtual network.
Publishing the ports tells the host machine to forward anything coming into
that port and forward it to the container port that is open in the
container and forwarded appropriately.  

__Note:__ you can't have 2 containers listening on the same port on the
host level.  I.E., you can't have two containers forwarding traffic from
port 80.

## Docker Networks: CLI Management
- `docker network ls`
- `docker network inspect`
- `docker network create --driver`
- `docker network connect`
- `docker network disconnect`
docker bridge is the default virtual network which is NAT'ed behind the
Host IP.

- `--network host`: it gains performance by skipping virtual networks but
  sacrifices security of container model

- `--network none` its not attached to anything

- `docker network create my_app_net`
- network driver built-in or 3rd party extensions that give you virtual
  network features


  - `docker container run -d --name new_nginx --network my_app_net nginx`
  - `docker network inspect my_app_net`

  - add exiting container: `docker network connect <NETWORK ID> <CONTAINER
    ID>`
  - remove from network `docker network disconnect <NETWORK ID <CONTAINER
    ID>`

## Docker Networks: DNS

- DNS is key to inter-container communication
- `--link` can enable DNS on default bridge network

__Note__: Static IP's and using IP's for communicating between containers
is an anti-pattern. Do your best to avoid it.  

Docker daemon has as built-in DNS server taht containers use by default.

Docker defaults the hostname to the container's name, but you can also set
aliases.  

- `docker container run -d --name my_nginx --network my_app_net nginx`
- `docker network inspect my_app_net` will contain multiple containers that
  are communicated via their names by default.
- `docker container exec -it my_nginx ping new_nginx` is an example of how
  docker manages DNS within the virtual networks. 

```
❯ docker container exec -it my_nginx ping new_nginx
PING new_nginx (172.18.0.2): 56 data bytes
64 bytes from 172.18.0.2: seq=0 ttl=64 time=0.073 ms
64 bytes from 172.18.0.2: seq=1 ttl=64 time=0.028 ms
64 bytes from 172.18.0.2: seq=2 ttl=64 time=0.026 ms
```
This solves a problem because you can't predict if they are going to exist,
where they are going to be, etc. 

For the default bridge network, it does not have the DNS server built into
it by default.  But you can use the `--link` option to specify manual links
for the default bridge network.  

Containers should not rely on IP's for inter-communication.  DNS  for
friendly names is a built in DOcker feature via custom networks.  Custom
networks is the best solution for inter-communication of containers.

- `docker container run --rm -it centos:7 bash`
This will create new centos container running with a bash.  

We can then run `yum update curl` for example to update curl.

The advantage of the `--rm` flag is it removes the container after you are
done.  

### Round Robin (kinda)

- `docker network create my_network`
- `docker container run -d --network my_network --net-alias search
  elasticsearch:2`
- `docker container run -d --network my_network --net-alias search`
- `docker container ls` should show both containers
- `docker container run --rm --network my_network alpine nslookup search` #
  should run dnslookup in container and immediately exit
- `docker container run --rm --network my_network centos curl -s
  search:9200`  #should be able to lookup either containers running


## Getting started with Docker Images

Images are the building blocks of containers.  For example, they can be
obtained from the Docker Hub registry.  

What is in an image:
- App binaries and dependencies
- Metadata about the image data and how to run the image
- It not a complete OS, no Kernel, Kernel modules such as drivers - the
  host provides the kernel.  


There is only one "official" version of each docker image, which is in part
maintained by the docker team.  If someone creates a custom image similar
to an official image such as `nginx` it will always start with the username
prefix, i.e., `mydockeruser/nginx-proxy`.

In some ways, docker hub is kind of the package manager system for
containers.  

## Image Layers - Image Cache Information

Some important topics include:

- Image Layers
- Union File System
- History and Inspect commands

## Print the history of the image layers 

A history of the image layers. Every image starts from the very beginning
with a blank layer known as scratch

```
❯ docker history nginx:latest
IMAGE          CREATED       CREATED BY                                      SIZE      COMMENT
b52e0b094bc0   4 weeks ago   CMD ["nginx" "-g" "daemon off;"]                0B        buildkit.dockerfile.v0
<missing>      4 weeks ago   STOPSIGNAL SIGQUIT                              0B        buildkit.dockerfile.v0
<missing>      4 weeks ago   EXPOSE map[80/tcp:{}]                           0B        buildkit.dockerfile.v0
<missing>      4 weeks ago   ENTRYPOINT ["/docker-entrypoint.sh"]            0B        buildkit.dockerfile.v0
<missing>      4 weeks ago   COPY 30-tune-worker-processes.sh /docker-ent…   4.62kB    buildkit.dockerfile.v0
<missing>      4 weeks ago   COPY 20-envsubst-on-templates.sh /docker-ent…   3.02kB    buildkit.dockerfile.v0
<missing>      4 weeks ago   COPY 15-local-resolvers.envsh /docker-entryp…   389B      buildkit.dockerfile.v0
<missing>      4 weeks ago   COPY 10-listen-on-ipv6-by-default.sh /docker…   2.12kB    buildkit.dockerfile.v0
<missing>      4 weeks ago   COPY docker-entrypoint.sh / # buildkit          1.62kB    buildkit.dockerfile.v0
<missing>      4 weeks ago   RUN /bin/sh -c set -x     && groupadd --syst…   117MB     buildkit.dockerfile.v0
<missing>      4 weeks ago   ENV DYNPKG_RELEASE=1~bookworm                   0B        buildkit.dockerfile.v0
<missing>      4 weeks ago   ENV PKG_RELEASE=1~bookworm                      0B        buildkit.dockerfile.v0
<missing>      4 weeks ago   ENV NJS_RELEASE=1~bookworm                      0B        buildkit.dockerfile.v0
<missing>      4 weeks ago   ENV NJS_VERSION=0.8.9                           0B        buildkit.dockerfile.v0
<missing>      4 weeks ago   ENV NGINX_VERSION=1.27.4                        0B        buildkit.dockerfile.v0
<missing>      4 weeks ago   LABEL maintainer=NGINX Docker Maintainers <d…   0B        buildkit.dockerfile.v0
<missing>      4 weeks ago   # debian.sh --arch 'amd64' out/ 'bookworm' '…   74.8MB    debuerreotype 0.15
```

__Note__: `<missing>` indicates that they are layers inside the image,
but not actually images themselves.  

When creating a new image, we start with one layer, and every layer get
its own unique `SHA` to help identify if this layer is the same as another
layer on the system.  

The `SHA` is unique, so it is a guaranteed to be the same layer.  

### Container Layer

Lets say we have an apache image and we want to run a container off of it,
it create a new read write layer on top of the apache image.  Underneath,
the storage driver that is used by docker, is layering like a stack of
pancakes all of these changes on top of each other. 

__Copy On Write__: The filesystem takes a file out of the image and copies
it into the container layer. 

From O'Reilly:

> Docker uses the copy-on-write technique when dealing with images. Copy-on-write is a strategy of sharing and copying files for maximum efficiency. If a layer uses a file or folder that is available in one of the low-lying layers, then it just uses it. If, on the other hand, a layer wants to modify, say, a file from a low-lying layer, then it first copies this file up to the target layer and then modifies it.

Source:  [O'Reilly - Learn Docker](https://www.oreilly.com/library/view/learn-docker/9781788997027/732e21de-52a7-4c42-bdba-56015f7062ab.xhtml "O'Reilly - Learn Docker - Copy On Write")


### Docker Image Inspect

Inspect give you back the metadata.  Besides the image ID and it's tags,
you get all sort sof details about how this image expects to be run.  For
example. It can tell you what Ports you need to open up if you want to
accept connections.  

You can see Environment variables, and commands that it is going to
run when it starts up.  

It can also tell us useful information such as the Architecture:
"amd64","os:linux"


## Image Tagging & Pushing To Docker Hub

__Important Concepts__:

- Image ID vs Tag
- How to upload to Docker Hub
- Image Tags


```
❯ docker image tag --help
Usage:  docker image tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]

Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE

Aliases:
  docker image tag, docker tag
```

Image don't technically have a name, but we refer to them like that.

This can be proved by running `docker image ls`.  Notice the absence of a
name column?

```
❯ docker image ls
REPOSITORY                                TAG          IMAGE ID       CREATED         SIZE
fusion-webpack                            latest       7b1fc89f614a   47 hours ago    860MB
<none>                                    <none>       112d76331e05   47 hours ago    860MB
washpost/fusion-engine                    latest       5dd6e4b3bdac   3 days ago      708MB
washpost/fusion-origin                    latest       91e87355e57e   10 days ago     227MB
washpost/fusion-cache-proxy               latest       3c7a3c706170   10 days ago     24.6MB
memcached                                 latest       36b77029f362   2 weeks ago     84.8MB
fusion_zip-zip                            latest       a30af9a3ae21   2 weeks ago     14.8MB
fusion_verify-verify                      latest       8fbe48cf5c75   2 weeks ago     716MB
alpine                                    latest       aded1e1a5b37   3 weeks ago     7.83MB
nginx                                     alpine       1ff4bb4faebc   4 weeks ago     47.9MB
nginx                                     latest       b52e0b094bc0   4 weeks ago     192MB
ubuntu                                    latest       a04dc4851cbc   5 weeks ago     78.1MB
httpd                                     latest       0de612e99135   6 weeks ago     148MB
mysql                                     latest       5568fddd4f66   6 weeks ago     797MB
washpost/fusion-resolver                  latest       065d0b72c223   2 months ago    623MB
mariadb                                   latest       6722945a6940   3 months ago    407MB
washpost/pb-editor-api                    dev          965551d554a9   9 months ago    751MB
pagebuilderteam/arc-themes-stylebuilder   latest       c689863d8e3f   11 months ago   203MB
washpost/fusion-cli-api                   production   9235387626da   12 months ago   973MB
washpost/mongo-vandelay                   latest       cc73e1bea97e   2 years ago     485MB
centos                                    7            eeb6ee3f44bd   3 years ago     204MB
mailhog/mailhog                           latest       4de68494cd0d   4 years ago     392MB
```

Instead we refer to them by 3 different pieces of information:

**`<user>/<repo>:<tag>`**

The repository is usually made up by the username or organization name /
the repository. 

Official images are the only images that can live at the root namespace of
the registry, so they do not need an account name in front of the repo
name.  


### Tags

The tag is not quite a version or branch, but similar to git tags.  It is
a pointer to a specific image commit.  Tags point to an image id so
multiple tags can point to the same image id.  

Can be numbers or names.  Docker manages namespaces and associates them to
image ids.  

We can re-tag existing docker images.  


`docker image tag nginx am/nginx`

```
❯ docker image tag --help
Usage:  docker image tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
#TARGET_IMAGE is kind of the new image

Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE

Aliases:
  docker image tag, docker tag
```

`:latest` doesn't necessarily mean the latest version, it doesn't have any
special meeting, but it is considered a convention.  

`docker image push mynewtag/nginx` will yield `denied: requested access to
the resource is denied`.  It tries to upload the tag, but if you haven't
logged in, then it won't work.  

`docker login <server>`

Defaults to logging into Docker Hub, but you can override by adding server
url.

The config file is located at `~/.docker/config.json` which holds your auth
tokens.

### Add Additional Tag

`docker image tag elkcityhazard/nginx elkcityhazard/nginx:my_new_tag`
`docker image push elkcityhazard/nginx:my_new_tag`











