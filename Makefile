

.PHONY: all frontend

all:
	@echo "Specify a task to do"

frontend:
	git pull
	npm run build --prefix frontend
	cp -r frontend/dist /var/www

backend:
	git pull
	go run *.go