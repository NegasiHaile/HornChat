include .env

.PHONY: all

build:
	docker build -t hornchat .

run:
	export $(cat .env | xargs)
	docker stop hornchat || true && docker rm hornchat || true
	docker run --name hornchat --rm -e OPENAI_API_KEY=${OPENAI_API_KEY} -p 3000:3000 hornchat

logs:
	docker logs -f hornchat

push:
	docker tag hornchat:latest ${DOCKER_USER}/hornchat:${DOCKER_TAG}
	docker push ${DOCKER_USER}/hornchat:${DOCKER_TAG}