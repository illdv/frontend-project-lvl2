install: 
	npm install

start: 
	npm start

publish:
	rm -rf dist
	npm publish  --dry-run

lint:
	npx eslint .