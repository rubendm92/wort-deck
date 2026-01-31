.PHONY: dev build lint preview install shell clean

IMAGE_NAME := wort-deck-frontend
CONTAINER_NAME := wort-deck-frontend-dev

dev:
	docker run --rm -it \
		-v $(PWD):/app \
		-v /app/node_modules \
		-p 5173:5173 \
		--name $(CONTAINER_NAME) \
		$(IMAGE_NAME)

build:
	docker run --rm \
		-v $(PWD):/app \
		-v /app/node_modules \
		$(IMAGE_NAME) npm run build

lint:
	docker run --rm \
		-v $(PWD):/app \
		-v /app/node_modules \
		$(IMAGE_NAME) npm run lint

preview:
	docker run --rm -it \
		-v $(PWD):/app \
		-v /app/node_modules \
		-p 4173:4173 \
		$(IMAGE_NAME) npm run preview -- --host

install:
	docker run --rm \
		-v $(PWD):/app \
		$(IMAGE_NAME) npm install

shell:
	docker run --rm -it \
		-v $(PWD):/app \
		-v /app/node_modules \
		$(IMAGE_NAME) sh

clean:
	docker rmi $(IMAGE_NAME) 2>/dev/null || true

docker-build:
	docker build -t $(IMAGE_NAME) .
