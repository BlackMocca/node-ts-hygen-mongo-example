version=latest

app.dev:
	yarn dev

app.build.prod:
	docker build -f Dockerfile -t node-ts-hygen-mongo-example:$(version) .

app.run.prod:
	docker run --rm --name node-ts-hygen-mongo-example --env-file=.env -p 3000:3000 -d node-ts-hygen-mongo-example:$(version)
