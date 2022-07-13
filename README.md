# Build A Storefront Backend v1.0.0

- This is a backend API build in Nodejs for an online store. It exposes a RESTful API that will be used by the frontend developer on the frontend.
- The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products and add products to an order that they can view in a cart page.

The database schema and and API route information can be found  [here](REQUIREMENTS.md)

- [x] API in main branch is v1.0.0 :heavy_check_mark:
- [ ] API in branch update-v1.1.0 :x:

## Installation Instructions
This section contains all the packages used in this project and how to install them.

1. Clone the project to your local machine:

```
2. Open the project

```
$ cd Online-Store-API
```
3. To install all packages:
```
 $ npm install
```
### Packages I used: 


* express

```
$ npm i  express 
$ npm i -D @types/express

```

* typescript

```
$ npm i -D typescript
$ npm i -D @types/node

```

* nodemon

```
$ npm i -D nodemon @types/nodemon
$ npm i ts-node -g
```

* dotenv
```
$ npm i dotenv
$ npm i -D @types/dotenv
```

* pg
``` 
$ npm i pg
$ npm i -D @types/pg
```

* postgres
```
$ npm i postgres
```
* db-migrate
```
$ npm i -g db-migrate db-migrate-pg
$ npm i -D @types/db-migrate
```

* cors
```
$ npm i cors
$ npm i -D @types/cors
```

* bcrypt
```
$ npm i bcrypt 
$ npm i -D @types/bcrypt
```

* jsonwebtoken
```
$ npm i jsonwebtoken 
$ npm i -D @types/jsonwebtoken
```

* jasmine
```
$ npm i -D jasmine jasmine-spec-reporter jasmine-ts @types/jasmine
```

* supertest
```
$ npm i -D supertest @types/supertest
```

* fs
```
$ npm i fs
```
## Set up Database

### Create Databases

We shall create the dev and test databases:

- connect to the default postgres database as the server's root 
```
$ user psql -U postgres
```
- In psql run the following command to create a user:
```
 $ CREATE USER full_stack_user WITH PASSWORD '123';
```

- In psql run the following commands to create the dev and test database: 
```
$ CREATE DATABASE full_stack_dev;

$ CREATE DATABASE full_stack_dev_test;
```
- Connect to the databases and grant all privileges: 

1. Grant for dev database

```
$ \c full_stack_dev

$ GRANT ALL PRIVILEGES ON DATABASE full_stack_dev TO full_stack_user;
```
2. Grant for test database
```
$ \c full_stack_dev_test

$ GRANT ALL PRIVILEGES ON DATABASE full_stack_dev_test TO full_stack_user;
```
### Migrate Database

Navigate to the root directory and run the command below to migrate the database

```
$ npm run up
```

## Environment Variables Set up 

Bellow are the environmental variables that needs to be set in a .env file.

```
POSTGRES_HOST=
POSTGRES_DB=
POSTGRES_TEST_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
ENV=
BCRYPT_PASSWORD=
SALT_ROUNDS=
TOKEN_SECRET=
```
## Start App

```
$ npm run start
```
 ### Running Ports

After start up, the server will start on port 5000 and the database on port 5432

### Endpoint Access

All endpoints are described [here](REQUIREMENTS.md)

### Token and Authentication

Tokens are passed along with the http header as

```
Authorization Bearer <token>
```
## Testing

1. unit tests.
2. Integration tests.

* Run test with
```
$ npm run test
```
1. It sets the environment to test. 
2. Migrates up tables for the test database.
3. Run the test then migrate down all the tables for the test database.
4. There is over than 70 testes to insure that the API without any issues.

## Building

to transbile the typescripts files to js files in build file

```
$ npm run build
```

