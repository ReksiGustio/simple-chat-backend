# Simple Chat Backend by Gustio

This is the backend side for Simple Chat app that let you contact with other user, using simple REST API.
For frontend side of this app, [Click Here.](https://github.com/ReksiGustio/SimpleChat)

## Dependencies

This backend side app is created with its dependencies:
- Node.js
- Express
- Cors
- Prisma ORM
- JSON Web Token
- mySQL

In order to run the backend server, simply run this on terminal:
```java
nodemon index
```

## Available Routes

- **POST /register** - Used for insert new user.
- **POST /login** - Used for login into one user and get authorization token.
- **GET /users** - Used to fetch all users registered.
- **GET /users/:userName** - Used for fetch one user regitered.
- **PUT /users/:userName** - Used to update user's data.
- **GET /message/:sender&:receiver** - Used to fetch all messages related to sender and receiver.
- **POST /message/:sender/:receiver** - Used to send one message to receiver.
