# Survei API

> RESTful API for Survei App

<p align="center">
  <a href="https://nodejs.org/">
    <img title="Restful API" src="https://cdn-images-1.medium.com/max/871/1*d2zLEjERsrs1Rzk_95QU9A.png">
  </a>
</p>

---

## Table of contents

- [API Surevei](#API-Media)
  - [Table of contents](#table-of-contents)
  - [TODO Tasks](#todo-tasks)
  - [Stacks](#stacks)
  - [Build Setup](#build-setup)
  - [API Docs](#api-docs)

## TODO Tasks

- [x] CRUD Quesions
- [x] CRUD Answers
- [x] CRUD Event
- [x] CRUD Submit
- [x] Handle Input Register and Login with JOI
- [x] Sort Users by level
- [x] Allowed CORS
- [x] Authentication with JWT

## Stacks

- NodeJS
- MySQL
- ExpressJS
- JWT
- Joi Validator

## Build Setup

1. Clone repository
   `$ git clone https://github.com/muhammadluth/API-MEDIA.git`

2. Install depedencies

```bash
# with npm
$ npm install

# or with yarn
$ yarn install
```

3. Setup your environment variable in `.env` files (if not exists, create your own).

```env
PORT = YOUR_PORT

DB_HOSTNAME = YOUR_HOST_NAME
DB_USERNAME = YOUR_USERNAME
DB_PASSWORD = YOUR_PASSWORD
DB_NAME = YOUR_DATABASE_NAME

SECRET_JWT = YOUR_SECRET_KEY_FOR_JWT
```

4. Start API server

```bash
$ yarn watch # start and watch server

$ yarn start # start server
```

## API Docs

- Run API : https://www.getpostman.com/collections/6fe04c5ae77bd1cf2b41

  note : _Please,get native app for run my API_

---

Copyright © 2019 by Muhammad Luthfi

RESTful API for Job Posting App

Prerequiste:
- Node.js
- Express.js

Definition:
- RESTful API: A RESTful API is an application program interface (API) that uses HTTP requests to GET, PUT, POST and DELETE data.
- Node.js: Node.js is a JavaScript runtime environment that includes everything you need to execute a program written in JavaScript.
- Express.js: ExpressJS is a web application framework for Node.js that provides you with a simple API to build websites, web apps and back ends.

