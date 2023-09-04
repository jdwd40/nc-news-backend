# Backend API Project

This backend API project serves data for various resources like topics, articles, comments, and users. The API provides multiple endpoints to interact with these resources.

## Table of Contents

1. [Installation](#installation)
2. [Endpoints](#endpoints)
   1. [Topics](#topics)
   2. [Articles](#articles)
   3. [Comments](#comments)
   4. [Users](#users)
3. [Usage](#usage)

## Installation

1. Clone the repository:

git clone https://github.com/jdwd40/nc-news-backend
2. Install dependencies:

cd nc-news-backend
npm install

cd db/
create .env.developmet and .env.test files
```
PGDATABASE=nc_news_api
PGPASSWORD=********
DATABASE_URL=postgresql://jd:******@localhost:5432/nc_news_api
```

run the setup.sql to create the databases

run the run.seed.js file to seed database

3. Start the server:

npm start

## Endpoints

### Topics

- **GET /api/topics**
  Returns all topics

### Articles

- **GET /api/articles**
  Returns all articles

- **GET /api/articles/:article_id**
  Returns a specific article by its ID

- **PATCH /api/articles/:article_id**
  Updates a specific article by its ID

### Comments

- **GET /api/articles/:article_id/comments**
  Returns all comments for a specific article

- **POST /api/articles/:article_id/comments**
  Adds a new comment to a specific article

- **PATCH /api/comments/:comment_id**
  Updates a specific comment by its ID

- **DELETE /api/comments/:comment_id**
  Deletes a specific comment by its ID

### Users

- **GET /api/users/:username**
  Returns a specific user by their username

## Usage

After starting the server, you can use any API testing tool (e.g., Postman) or your frontend application to make requests to the available endpoints. The server runs on port 9090.

For example, to get all topics, you would make a GET request to:

http://localhost:9090/api/topics