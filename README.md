## Spring Developer Assessment
Hi! My name is Ahaan Limaye, and I'm a first-year CS student at Georgia Tech. Here is my animal training management app for the Bits of Good developer position. I made it with ExpressJS and MongoDB. Hope you like it :)

## Setup
- Install NodeJS
- Clone the respository: `git clone https://github.com/ahaanlimaye/spring23-dev-assessment.git`
- CD into repository:  `cd spring23-dev-assessment`
- Install the dependencies: `npm install`
- Create `.env` file with the following content:
`DATABASE_URI="mongodb+srv://admin:9ozKBIMBHBFo71Wd@cluster0.3bzdczx.mongodb.net/AnimalTrainingManagement?retryWrites=true&w=majority"
JWT_STRING="174015e35f9cb38e63e6524f0e32dc1aaadb3a918d68268cde06d6d2812c041fa5c4b8913221c8e7867e4feb03701608d8874ca9882db678293f379417f23059"`
- Start the HTTP server: `npm run start`
- Navigate to `http://localhost:8000/api/health`

## API Endpoints (all endpoints with (*) tag require a JSON Web Token in authorizaton header)
`GET http://localhost:8000/api/health`: test whether API server is functioning and healthy

`POST http://localhost:8000/api/user`: create a user in the database based on information passed into the body
- sample body:  `{ "firstName": "John", "lastName": "Smith", "email": "johnsmith@gmail.com", "password": "1234" }`

`POST http://localhost:8000/api/animal`(*): create an animal in the database based on information passed into the body
- sample body: `{ "name": "Doggy", "hoursTrained": 10, "dateOfBirth": "03/14/15" }`

`POST http://localhost:8000/api/training`(*): create a training log in the database based on information passed into the body
- sample body: `{ "date": "08/05/22", "description": "played catch", "hours": 4, "animal": "63c5d9e17f3aa9d21765b018" }`

`GET http://localhost:8000/api/admin/users`(*): returns all of the users in the database (not with their passwords)
- includes params `limit` and `page` for pagination, eg. `?limit=2&page=3`

`GET http://localhost:8000/api/admin/animals`(*): returns all of the animals in the database
- includes params `limit` and `page` for pagination, eg. `?limit=2&page=3`

`GET http://localhost:8000/api/admin/training`(*): returns all of the training logs in the database
- includes params `limit` and `page` for pagination, eg. `?limit=2&page=3`

`POST http://localhost:8000/api/user/login`: accepts an email and password and tests whether the password is valid for the given email
- sample body: `{ "email": "johnsmith@gmail.com", "password": "1234" }`

`POST http://localhost:8000/api/user/verify`: issues a JSON Web Token to the user if they issue the correct email/password combination
- sample body: `{ "email": "johnsmith@gmail.com", "password": "1234" }`
