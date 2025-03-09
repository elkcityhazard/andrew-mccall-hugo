---
title: 'Docker: Important Topics & Notes'
date: 2025-03-07
author: Andrew M McCall
description: 'Some basic docker commands for reference. My personal important topics and notes for Docker.'
summary:  'This is a repository of my notes and important topics on docker commands. Helpful for when I forget things.'
publishDate: '2025-03-07T19:31:54-05:00' 
updateDate:  '2025-03-07T19:31:54-05:00'
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
- 

















