build:
	docker build -t bill_api:1.0.0 api
# 	docker build -t bill_app:1.0.0 app

up:
	docker compose up -d

down:
	docker compose down
	docker rmi bill_api:1.0.0
# 	docker rmi bill_app:1.0.0
