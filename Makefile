export project = devops
export env     = lab
export domain  = punkerside.io

export AWS_DEFAULT_REGION=us-west-2
export DOCKER_BUILDKIT=0

DOCKER_UID  = $(shell id -u)
DOCKER_GID  = $(shell id -g)
DOCKER_USER = $(shell whoami)

base:
	@docker build -t ${project}-${env}:python -f Dockerfile.python .
	@docker build -t ${project}-${env}:npm -f Dockerfile.npm .

build:
	@echo "${DOCKER_USER}:x:${DOCKER_UID}:${DOCKER_GID}::/app:/sbin/nologin" > passwd
	@docker run --rm -u ${DOCKER_UID}:${DOCKER_GID} -v ${PWD}/passwd:/etc/passwd:ro -v ${PWD}/app/ui:/app ${project}-${env}:npm

up:
	@docker-compose up

down:
	@docker-compose down