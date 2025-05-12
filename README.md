# Simple-Hotel-Lister

Project Description: Simple Hotel Lister is a full-stack web application implying Django and React.js that allows users to search for hotels in specific locations, filter results by star rating and pool availability, view hotel details, and bookmark their favorites. Also, this project supports light/dark theme toggling and includes a secure user registration and login system.

Setup and Installation Instruction: 

For backend, 

python -m venv env_site

.\env_site\Scripts\activate

pip install django djangorestframework pygments

django-admin startproject Backend

cd Backend

python.exe .\manage.py startapp hotel_lister_backend

python.exe .\manage.py makemigrations

python.exe .\manage.py migrate

python.exe .\manage.py runserver

For frontend,

npx create-react-app frontend

cd frontend

npm start

Instructions for Running the Project Locally: 

For backend,

cd Backend

python.exe .\manage.py runserver

For frontend,

cd frontend

npm start

Data Handling: Hotel data is managed using static JSON file stored in the backend. This approach ensures consistent testing and simplified setup.

AI Tools Used: ChatGPT was used to debug CSRF and CORS issues and to create reusable authentication logic (JWT).
