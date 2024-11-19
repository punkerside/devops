export project = devops
export env     = lab
export domain  = punkerside.io

export AWS_DEFAULT_REGION=us-west-2
export DOCKER_BUILDKIT=0

DOCKER_UID  = $(shell id -u)
DOCKER_GID  = $(shell id -g)
DOCKER_USER = $(shell whoami)

base:
	docker build -t ${project}-${env}:base -f Dockerfile.python .

up:
	docker-compose up

down:
	docker-compose down