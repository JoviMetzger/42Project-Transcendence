# Variables
DOCKER_COMPOSE_DEV = docker-compose -f srcs/docker-compose.dev.yml
DOCKER_COMPOSE = docker-compose -f srcs/docker-compose.yml

# Default target
.DEFAULT_GOAL := help

# Help
help:
	@echo "Available commands:"
	@echo "  make dev         - Start development environment"
	@echo "  make dev-rebuild - builds the images again and starts the contianers"
	@echo "  make down        - Stop all containers"
	@echo "  make build       - Rebuild all containers"
	@echo "  make rebuild     - Force rebuild all containers"
	@echo "  make logs        - View logs from all containers"
	@echo "  make clean       - Remove all containers and volumes"
	@echo "  make install     - Install dependencies for both frontend and backend"
	@echo "  make prod        - Start production environment"
	@echo "  copy env		  - copies env stored on local machine from ~/.transcendence.env to the right directory"

# Development commands
dev:
	$(DOCKER_COMPOSE_DEV) up -d

dev-build:
	$(DOCKER_COMPOSE_DEV) build

dev-down:
	$(DOCKER_COMPOSE_DEV) down

dev-rebuild: 
	rm -rf ./srcs/backend/.pnpm-store
	make dev-down
	make dev-build
	make dev

build:
	$(DOCKER_COMPOSE) build

logs:
	$(DOCKER_COMPOSE_DEV) logs

clean:
	$(DOCKER_COMPOSE_DEV) down -v
	docker system prune -f

# Installation commands
install:
	cd frontend && npm install
	cd backend && npm install

# Production commands
prod:
	$(DOCKER_COMPOSE) up -d

prod-down:
	$(DOCKER_COMPOSE) down

# since we cant send the env file to the git repository. store the env on your local machine in file ~/.transcendence.env - will share on slack
copy-env:
	cp ~/.transcendence.env ./srcs/.env

.PHONY: help dev dev-build down build dev-rebuild logs clean install prod prod-down copy-env