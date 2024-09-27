## Description

## Project setup

```bash
$ npm install
$ npx prisma db push
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Prisma ORM

```bash
$ npx prisma migrate dev --name <NAME_MIGRATION>
$ npx prisma db push
$ npx prisma db generate
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Convecional Commit

```bash
# Crear un changelog desde 0, si existe lo reemplaza si no lo crea
$ npx conventional-changelog -p angular -s -r 0 -i <NAME_CHANGELOG>.md

# Actualizar changelog ya creado
$ npx conventional-changelog -p angular -s -i <NAME_CHANGELOG>.md
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
