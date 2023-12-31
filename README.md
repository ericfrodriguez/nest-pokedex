<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Nest Pokemon API

## Tech stack

- Typescript
- Node (JavaScript runtime environment)
- Nest.js (Web server framework)
- Mongoose (ODM)
- MongoDB

## System Requirements
- Nest CLI. [Prerequisites and setup](https://docs.nestjs.com/first-steps#prerequisites).
- Docker and Docker Compose. [Docker docs installation](https://docs.docker.com/get-docker).

## Running the app

1. Clone the repository
2. Install dependecies

```bash
yarn install
```
3. Create .env file with database environment variables.
```javascript
MONGO_USER=
MONGO_PASSWORD=
MONGO_PORT=
MONGO_DATABASE=
```
4. Run database
```bash
# In a terminal on root file project
docker compose up -d
```

## Development

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
