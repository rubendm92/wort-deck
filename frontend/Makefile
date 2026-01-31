.PHONY: dev build lint preview install shell clean docker-build

IMAGE_NAME := wort-deck-frontend
CONTAINER_NAME := wort-deck-frontend-dev
NODE_MODULES_VOLUME := wort-deck-frontend-node-modules

dev:
	docker run --rm -it \
		-v $(PWD):/app \
		-v $(NODE_MODULES_VOLUME):/app/node_modules \
		-p 5173:5173 \
		--name $(CONTAINER_NAME) \
		$(IMAGE_NAME)

build:
	docker run --rm \
		-v $(PWD):/app \
		-v $(NODE_MODULES_VOLUME):/app/node_modules \
		$(IMAGE_NAME) sh -c "npm install && npm run build"

lint:
	docker run --rm \
		-v $(PWD):/app \
		-v $(NODE_MODULES_VOLUME):/app/node_modules \
		$(IMAGE_NAME) sh -c "npm install && npm run lint"

preview:
	docker run --rm -it \
		-v $(PWD):/app \
		-v $(NODE_MODULES_VOLUME):/app/node_modules \
		-p 4173:4173 \
		$(IMAGE_NAME) sh -c "npm install && npm run preview -- --host"

install:
	docker run --rm \
		-v $(PWD):/app \
		-v $(NODE_MODULES_VOLUME):/app/node_modules \
		$(IMAGE_NAME) npm install

shell:
	docker run --rm -it \
		-v $(PWD):/app \
		-v $(NODE_MODULES_VOLUME):/app/node_modules \
		$(IMAGE_NAME) sh

clean:
	docker rmi $(IMAGE_NAME) 2>/dev/null || true
	docker volume rm $(NODE_MODULES_VOLUME) 2>/dev/null || true

docker-build:
	docker build -t $(IMAGE_NAME) .
