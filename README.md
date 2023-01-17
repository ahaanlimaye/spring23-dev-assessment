## Spring Developer Assessment
Hi! My name is Ahaan Limaye, and I'm a first-year CS student at Georgia Tech. Here is my animal training management app for the Bits of Good developer position. I made it with ExpressJS and MongoDB. Hope you like it :)

## Setup
- Install NodeJS
- Clone the respository: `https://github.com/ahaanlimaye/spring23-dev-assessment`
- Install the dependencies: `npm install`
- Start the HTTP server: `npm run start`
- Navigate to `http://localhost:8000/api/health`

## API Endpoints (all endpoints with (*) tag require a JSON Web Token in authorizaton header)
- `GET http://localhost:8000/api/health`: test whether API server is functioning and healthy
- `POST http://localhost:8000/api/user`: create a user in the database based on information passed into the body
  -  Sample body: `{ "firstName": "John", "lastName": "Smith", "email": "johnsmith@gmail.com", "password": "1234" }`
- `POST http://localhost:8000/api/animal`(*): create an animal in the database based on information passed into the body
- `POST http://localhost:8000/api/training`(*): create a training log in the database based on information passed into the body
- `GET http://localhost:8000/api/admin/users`(*): returns all of the users in the database (not with their passwords)
- `GET http://localhost:8000/api/admin/animals`(*): returns all of the animals in the database
- `GET http://localhost:8000/api/admin/training`(*): returns all of the training logs in the database
- `POST http://localhost:8000/api/user/login`: accepts an email and password and tests whether the password is valid for the given email
- `POST http://localhost:8000/api/user/verify`: issues a JSON Web Token to the user if they issue the correct email/password combination
