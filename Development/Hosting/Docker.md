# Docker

- Developer machine → [Docker Desktop](https://www.docker.com/products/docker-desktop) or Docker Engine Community
- Small server → Docker Engine Community
- Critical applications → Docker Engine Enterprise or Kubernetes

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


## Useful Docker commands from Causality

Pull down images and start services:
- `docker compose up`

Install laravel dependencies:
- `docker compose run --rm composer install`

Stopping the local service
- `docker compose stop`

### Using Composer
- `docker compose run --rm composer install`
- `docker compose run --rm composer outdated`
- `docker compose run --rm composer update`

### Using Laravel Artisan
- `docker compose run --rm php php artisan`

### Running tests
- `docker compose run --rm php php artisan test`

### Testing
Running all tests:
- `docker compose run --rm php php artisan test`

Running a suite:
- `docker compose run --rm php php artisan test --testsuite Faeature`

### Useful parameters
- `--rm` Removes the container after run
- `-d` Detach, get the console back after run
- `--build` Forces a rebuild of images


## Comparisons

### Docker vs Vagrant

- **Vagrant** creates and configures lightweight, reproducible, and portable development environments.
- **Docker** is an open platform for building, shipping, and running distributed applications.

Where Docker relies on the host operating system, Vagrant includes the operating system within itself as part of the package. One big difference between Docker and Vagrant is that Docker containers run on Linux, but Vagrant files can contain any operating system. That said, Docker does work with non-Linux operating systems. It just needs to run within a Linux virtual machine.

### Docker vs Kubernetes

Docker is a containerization platform, and Kubernetes is a container orchestrator for container platforms like Docker.

Kubernetes, Mesos, and Docker Swarm are some of the more popular options for providing an abstraction to make a cluster of machines behave like one big machine, which is vital in a large-scale environment.


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
