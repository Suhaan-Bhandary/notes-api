# Notes API

## Speer - Back End Problem

You have been asked to build a secure and scalable RESTful API that allows users to create, read, update, and delete notes. The application should also allow users to share their notes with other users and search for notes based on keywords.

## Tech Stack

**Server:** Node, Express with Typescript

**Database:** Postgresql

**Libraries:** Kysely, Joi, Eslint, Prettier, dotenv, bcryptjs, nodemon, jsonwebtoken, express-rate-limit, jest

### Tech Stack Details

#### Typescript

In place of using plain vanilla javascript, I used Typescript as it provides Static Typing, Code Readability and Maintainability.

#### Postgresql

Since the given Problem represent a structured modal for storing data I used a Relational Database. In RDBMS, Postgresql provides scalability as it is designed to scale horizontally and vertically, and also allows flexible datatype, with security features. It also provides a efficient indexing mechanism and supports full-text search, making it performant for search notes with keywords. Postgresql is also known for it's easy Data Backup and Recovery.

#### kysely

Kysely is a type-safe and autocompletion-friendly TypeScript SQL query builder. Inspired by Knex. As it was made for typescript from the beginning, it provides a strong typechecking system for the database.

#### Joi

Joi is used to define Schema and check if the given data matches the same schema or not. It is used to validate the data coming from the request before using it.

#### Eslint, Prettier

Both Eslint, Prettier as usefully for code readability and maintainability as both helps to maintain a standard through out the organization.

#### bcryptjs

bcryptjs is a hash library which is used to hash data also compare them with hash.

#### jsonwebtoken

Libraries used for creating and decoding JWT tokens.

#### express-rate-limit

Express rate limit applies a limit on the IP addresses in a hard window time.

#### jest

Used for testing, it provides different methods for easily checking and testing the code.

## Instructions to run the code and run the tests

### Database Setup

- Install Postgresql
- Create database notes and create extension (used in indexing).

  ```bash
      createdb notes


      <!-- In psql, go to newly creates notes db -->
      \c notes;
      CREATE EXTENSION pg_trgm;
      CREATE EXTENSION btree_gin;
  ```

- Create database notes-test and create extension (used in indexing), similar to before.

  ```bash
  createdb notes-test


  <!-- In psql, go to newly creates notes-test db -->
  \c notes-test;
  CREATE EXTENSION pg_trgm;
  CREATE EXTENSION btree_gin;
  ```

- Check if EXTENSION are created in both the DB.

### REST API Setup

- Go to https://github.com/Suhaan-Bhandary/notes-api and clone the Repo.
- cd to notes-api directory once cloned.
- Run the command: `bash npm i`
- Create .env in the root of the project where .test.env is present and below is an example of the env file, replace values as required, eg: Database Config values.(Don't change DATABASE value if created notes)

```env
# Server Config
PORT=8080

# Postgres Database Config
DATABASE='notes'
DATABASE_HOST='localhost'
DATABASE_USER='postgres'
DATABASE_PASSWORD='password'
DATABASE_PORT=5432

# JWT Token Config
SECRET_KEY="big-secret-key"

# Rate limit
WINDOW_SIZE_NON_AUTH_MIN=1
LIMIT_NON_AUTH=5

WINDOW_SIZE_AUTH_MIN=1
LIMIT_AUTH=20
```

- Go to the .test.env and also update the values in it(Don't change DATABASE value if created notes-test).

### Migrating the Database

Befor running the API we have to first migrate the Database. For this run `bash npm run npm run db:migrate:latest`, this command will migrate the tables to the database.

### Running the API

- In Development: `bash npm run dev`
- In Production: `bash npm run build && npm run start`

### Running the tests

- Tests: `bash npm run test`

### Using the API on Postman

- Go to my Public Postman Workspace and fork it: https://www.postman.com/mission-architect-94960085/workspace/public/collection/16036286-c35b4e2a-074c-4f3d-8a48-61d5bb375b31?action=share&creator=16036286
- Create a user using the signin route in auth folder.
- Login with the email and password.
- Copy the AccessToken and in the side-bar click on the Notes Collection and in Authorization paste the bearer token.
- Now you can access all the authorized routes.

## API Reference

### Auth Routes

#### Signup

```http
  POST /api/auth/signup
```

| Body       | Type     | Description                |
| :--------- | :------- | :------------------------- |
| `name   `  | `string` | **Required**. Your Name    |
| `email  `  | `string` | **Required**. Your Email   |
| `password` | `string` | **Required**. New Password |

#### Signup

```http
  POST /api/auth/login
```

| Body       | Type     | Description                |
| :--------- | :------- | :------------------------- |
| `email  `  | `string` | **Required**. Your Email   |
| `password` | `string` | **Required**. New Password |

### Notes Routes

#### Create Note (Bearer Token Required)

```http
  POST /api/notes
```

| Body          | Type     | Description                     |
| :------------ | :------- | :------------------------------ |
| `title`       | `string` | **Required**. Title of the note |
| `description` | `string` | Description of the note         |

#### Share Note (Bearer Token Required)

```http
  POST /api/notes/:noteId/share
```

| Body         | Type     | Description                                        |
| :----------- | :------- | :------------------------------------------------- |
| `shareEmail` | `string` | **Required**. Email of the user to share the note. |

#### Get user notes (Bearer Token Required)

```http
  GET /api/notes
```

#### Get user note by ID (Bearer Token Required)

```http
  GET /api/notes/:id
```

#### Search user notes with query (Bearer Token Required)

```http
  GET /api/notes/search?q=query
```

| Query | Type     | Description                          |
| :---- | :------- | :----------------------------------- |
| `q`   | `string` | **Required**. Keyword for searching. |

#### Update user note with ID (Bearer Token Required)

```http
  PUT /api/notes/:id
```

| body          | Type     | Description             |
| :------------ | :------- | :---------------------- |
| `title`       | `string` | Title of the note       |
| `description` | `string` | Description of the note |

#### Delete user note with ID (Bearer Token Required)

```http
  DELETE /api/notes/:id
```

## 🚀 About Me

- [Suhaan-Bhandary](https://www.linkedin.com/in/suhaan-bhandary)
