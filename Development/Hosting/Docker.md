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

- `docker ps -a`: lists all containers
- `docker ps`: lists the containers that are still running.
- `docker image ls`: lists all images
- `docker logs [container ID]`: retrieves the logs of a container, even when it has stopped
- `docker inspect [container ID]`: gets detailed information about a running or stopped container
- `docker stop`: stops a container that is still running
- `docker rm`: deletes a container
- `docker image rm`: remove image

### docker run

	docker run hello-world

### Useful Docker commands from Causality

Pull down images and start services (`-d` is for daemon/background):
- `docker compose up -d`

Install laravel dependencies:
- `docker compose run --rm composer install`

Stopping the local service
- `docker compose stop`

#### Using Composer

- `docker compose run --rm composer install`
- `docker compose run --rm composer outdated`
- `docker compose run --rm composer update`

#### Using Laravel Artisan

- `docker compose run --rm php php artisan`

#### Running tests

- `docker compose run --rm php php artisan test`

#### Testing

Running all tests:
- `docker compose run --rm php php artisan test`

Running a test suite:
- `docker compose run --rm php php artisan test --testsuite Feature`

#### Useful parameters

- `--rm` Removes the container after run
- `-d` Detach, get the console back after run
- `--build` Forces a rebuild of images

### All `docker` commands

- docker app
- [docker attach](https://docs.docker.com/engine/reference/commandline/attach/)
- [docker build](https://docs.docker.com/engine/reference/commandline/build/)
- docker builder
- docker buildx
- docker checkpoint
- [docker commit](https://docs.docker.com/engine/reference/commandline/commit/)
- docker compose
- docker config
- docker container
- docker context
- [docker cp](https://docs.docker.com/engine/reference/commandline/cp/)
- [docker create](https://docs.docker.com/engine/reference/commandline/create/)
- [docker diff](https://docs.docker.com/engine/reference/commandline/diff/)
- [docker events](https://docs.docker.com/engine/reference/commandline/events/)
- [docker exec](https://docs.docker.com/engine/reference/commandline/exec/)
- [docker export](https://docs.docker.com/engine/reference/commandline/export/)
- [docker history](https://docs.docker.com/engine/reference/commandline/history/)
- [docker image](https://docs.docker.com/engine/reference/commandline/image/)
- [docker images](https://docs.docker.com/engine/reference/commandline/images/)
- [docker import](https://docs.docker.com/engine/reference/commandline/import/)
- [docker info](https://docs.docker.com/engine/reference/commandline/info/)
- [docker inspect](https://docs.docker.com/engine/reference/commandline/inspect/)
- [docker kill](https://docs.docker.com/engine/reference/commandline/kill/)
- [docker load](https://docs.docker.com/engine/reference/commandline/load/)
- [docker login](https://docs.docker.com/engine/reference/commandline/login/)
- [docker logout](https://docs.docker.com/engine/reference/commandline/logout/)
- [docker logs](https://docs.docker.com/engine/reference/commandline/logs/)
- docker manifest
- docker network
- docker node
- [docker pause](https://docs.docker.com/engine/reference/commandline/pause/)
- docker plugin
- [docker port](https://docs.docker.com/engine/reference/commandline/port/)
- [docker ps](https://docs.docker.com/engine/reference/commandline/ps/)
- [docker pull](https://docs.docker.com/engine/reference/commandline/pull/)
- [docker push](https://docs.docker.com/engine/reference/commandline/push/)
- [docker rename](https://docs.docker.com/engine/reference/commandline/rename/)
- [docker restart](https://docs.docker.com/engine/reference/commandline/restart/)
- [docker rm](https://docs.docker.com/engine/reference/commandline/rm/)
- [docker rmi](https://docs.docker.com/engine/reference/commandline/rmi/)
- [docker run](https://docs.docker.com/engine/reference/commandline/run/)
- [docker save](https://docs.docker.com/engine/reference/commandline/save/)
- [docker search](https://docs.docker.com/engine/reference/commandline/search/)
- docker secret
- docker service
- docker stack
- [docker start](https://docs.docker.com/engine/reference/commandline/start/)
- [docker stats](https://docs.docker.com/engine/reference/commandline/stats/)
- [docker stop](https://docs.docker.com/engine/reference/commandline/stop/)
- docker swarm
- docker system
- [docker tag](https://docs.docker.com/engine/reference/commandline/tag/)
- [docker top](https://docs.docker.com/engine/reference/commandline/top/)
- docker trust
- [docker unpause](https://docs.docker.com/engine/reference/commandline/unpause/)
- [docker update](https://docs.docker.com/engine/reference/commandline/update/)
- [docker version](https://docs.docker.com/engine/reference/commandline/version/)
- docker volume
- [docker wait](https://docs.docker.com/engine/reference/commandline/wait/)


## The `Dockerfile`

https://docs.docker.com/engine/reference/builder/

- [FROM](https://docs.docker.com/engine/reference/builder/#from)
- [RUN](https://docs.docker.com/engine/reference/builder/#run)
	- RUN echo 'we are running some # of cool things'
- [CMD](https://docs.docker.com/engine/reference/builder/#cmd)
- [LABEL](https://docs.docker.com/engine/reference/builder/#label)
- [EXPOSE](https://docs.docker.com/engine/reference/builder/#expose)
- [ENV](https://docs.docker.com/engine/reference/builder/#env)
- [ADD](https://docs.docker.com/engine/reference/builder/#add)
- [COPY](https://docs.docker.com/engine/reference/builder/#copy)
- [ENTRYPOINT](https://docs.docker.com/engine/reference/builder/#entrypoint)
- [VOLUME](https://docs.docker.com/engine/reference/builder/#volume)
- [USER](https://docs.docker.com/engine/reference/builder/#user)
- [WORKDIR](https://docs.docker.com/engine/reference/builder/#workdir)
- [ARG](https://docs.docker.com/engine/reference/builder/#arg)
- [ONBUILD](https://docs.docker.com/engine/reference/builder/#onbuild)
- [STOPSIGNAL](https://docs.docker.com/engine/reference/builder/#stopsignal)
- [HEALTHCHECK](https://docs.docker.com/engine/reference/builder/#healthcheck)
- [SHELL](https://docs.docker.com/engine/reference/builder/#shell)

ENTRYPOINT + CMD = default container command arguments


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

Running:

	minikube start
	tilt up


## Applications on Docker

### Postgres SQL on Docker

`~/postgres-docker/docker-compose.yml`:

	version: '3'
	services:
		db:
			image: postgres:15
			environment:
				POSTGRES_USER: postgres
				POSTGRES_PASSWORD: [hidden]
				POSTGRES_DB: admin_db  # Just to ensure Postgres starts
			volumes:
				- postgres-data:/var/lib/postgresql/data
				- ./init.sql:/docker-entrypoint-initdb.d/init.sql  # Define the real databases here
			ports:
				- "5432:5432"

	volumes:
		postgres-data:

`~/postgres-docker/init.sql`:

	-- CREATE USER "project_user" WITH ENCRYPTED PASSWORD '...'; GRANT ALL PRIVILEGES ON DATABASE "my-database" TO "project_user";
	CREATE DATABASE "my-database"; GRANT ALL PRIVILEGES ON DATABASE "my-database" TO postgres;

Commands:

	docker-compose down
	docker-compose up -d
	docker ps -a
	docker logs postgres-docker-db-1

	psql -h myserver.com -p 5432 -U postgres -W my-database

If you get “address in use” error:

	sudo systemctl stop postgresql
	docker-compose up -d
