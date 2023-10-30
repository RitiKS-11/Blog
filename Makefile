runserver:
	@echo "Running server....."
	@cd backend && source .venv/bin/activate && python manage.py runserver
	
migrate:
	@echo "Migrating the database....."
	@cd backend && source .venv/bin/activate && python manage.py makemigrations && python manage.py migrate

install:
	@echo "Installing the dependencies....."
	@cd backend && source .venv/bin/activate && pip install -r requirements.txt
	



dev:
	@echo "Creating the site....."
	@cd frontend && npm run dev

install-react:
	@echo "Installing react dependencies"
	@cd frontend && npm install