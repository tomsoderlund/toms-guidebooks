# Docker

- Developer machine -> [Docker Desktop](https://www.docker.com/products/docker-desktop) or Docker Engine Community
- Small server -> Docker Engine Community
- Critical applications -> Docker Engine Enterprise or Kubernetes

## Concepts

- **Container**: a virtual machine
- **Server**: runs multiple Containers
- **Image**: a template used to create Container(s)
- **Registry**: storage for Images

## Commands

	docker run --help

- `docker ps`: lists the containers that are still running. Add the `-a` switch in order to see containers that have stopped
- `docker logs [container ID]`: retrieves the logs of a container, even when it has stopped
- `docker inspect [container ID]`: gets detailed information about a running or stopped container
- `docker stop`: stops a container that is still running
- `docker rm`: deletes a container

### docker run

		docker run hello-world

## Vagrant

- Vagrant is a tool focused on providing a consistent development environment workflow across multiple operating systems.
- Docker is a container management that can consistently run software as long as a containerization system exists.

## Minikube and Tilt

- https://www.virtualbox.org/wiki/Downloads
- https://minikube.sigs.k8s.io/docs/start/ – `brew install minikube`
- https://docs.docker.com/docker-for-mac/install/
- https://docs.tilt.dev/install.html

local DNS resolver

192.168.1.247

	sudo nano /etc/resolver/minikube-dev

## Run

	minikube start
	tilt up
