# Media

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
# install packages
$ yarn install
```

## Running the app in development mode

```bash
# start the app watch mode
$ yarn run start:dev
```

## API

The server will listen on port `3000`, and it exposes the following APIs:

- **POST** - `/media` - Create a new media object

  - **type** - _string_ ('audio' or 'video')
  - **title** - _string_
  - **description** - _string_
  - **url** - _string_

- **GET** - `/media?page=1&perPage=12` - Fetch a paginated list of existing media objects
- **GET** - `/media/:id` - Fetch a single media by id

- **DELETE** - `/media/:id` - Soft delete a media item by id

- **PATCH** - `/media/:id/status` - Update an existing media status by id. Only accept changes to the status field

- **GET** - `/media/search?query=xyz` - Search media by title and description

## Swagger

Swagger docs can be found at <http://localhost:3000/api> when the app is running
Generated `swagger.json` can be found [here](swagger.json)

## SQL

Database SQL can be found [here](script.sql)

## Postman

The postman collection can be found [here](postman_collection.json)
