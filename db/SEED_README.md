# Database Seeding Explained

## Overview

Seeding is the initial process of populating a database with example data. The file `seed.js` provides a function called `seed` that takes in data for topics, users, articles, and comments, and inserts them into the respective tables in the PostgreSQL database. This document aims to break down the code to explain how the database seeding works.

## Importing Dependencies

```javascript
const format = require('pg-format');
const {
  convertTimestampToDate,
  createRef,
  formatComments,
} = require('../utils');
const db = require('./connection');
const { dropTables, createTables } = require('./manage-tables');
```

- `pg-format`: PostgreSQL query formatting library.
- `convertTimestampToDate`, `createRef`, `formatComments`: Utility functions for data manipulation.
- `db`: Database connection instance.
- `dropTables`, `createTables`: Functions to manage database tables.

## The `seed` Function

The `seed` function is an asynchronous function that accepts an object containing arrays of data for topics, users, articles, and comments.

### Dropping and Creating Tables

```javascript
await dropTables();
await createTables();
```

- It drops any existing tables and creates new tables in the database to ensure a clean slate.

### Inserting Topics and Users

The following code snippet uses the `pg-format` library to create SQL query strings for inserting topics and users:

```javascript
const insertTopicsQueryStr = format(
  'INSERT INTO topics (slug, description) VALUES %L RETURNING *;',
  topicData.map(({ slug, description }) => [slug, description])
);

const insertUsersQueryStr = format(
  'INSERT INTO users ( username, name, avatar_url) VALUES %L RETURNING *;',
  userData.map(({ username, name, avatar_url }) => [
    username,
    name,
    avatar_url,
  ])
);
```

- `%L` acts as a placeholder that is replaced by the values provided in the second argument.
- `RETURNING *` fetches all the inserted rows.

### Inserting Articles

The code snippet below handles the insertion of articles:

```javascript
const formattedArticleData = articleData.map(convertTimestampToDate);
const insertArticlesQueryStr = format(
  'INSERT INTO articles (title, topic, author, body, created_at, votes) VALUES %L RETURNING *;',
  formattedArticleData.map(
    ({ title, topic, author, body, created_at, votes = 0 }) => [
      title,
      topic,
      author,
      body,
      created_at,
      votes,
    ]
  )
);
```

- Timestamps are converted to date formats using `convertTimestampToDate`.

### Inserting Comments

The code handles the insertion of comments as follows:

```javascript
const articleIdLookup = createRef(articleRows, 'title', 'article_id');
const formattedCommentData = formatComments(commentData, articleIdLookup);
const insertCommentsQueryStr = format(
  'INSERT INTO comments (body, author, article_id, votes, created_at) VALUES %L RETURNING *;',
  formattedCommentData.map(
    ({ body, author, article_id, votes = 0, created_at }) => [
      body,
      author,
      article_id,
      votes,
      created_at,
    ]
  )
);
```

- `createRef` creates a reference object to map article titles to article IDs.
- `formatComments` uses the reference object to replace article titles with article IDs in the comment data.

## Conclusion

The `seed` function encapsulates the logic for populating the database tables with example data, thereby making it easier for testing and development.