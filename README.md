# Testing the Playground API using Node

# Project Structure
```
├───config
├───markdown
├───public
│   ├───css
│   └───postman
├───src
│   ├───db
│   ├───hooks
│   ├───middleware
│   │   └───swagger
│   │       └───swagger-ui
│   │           ├───css
│   │           ├───fonts
│   │           ├───images
│   │           └───lang
│   └───services
│       ├───categories
│       │   └───hooks
│       ├───products
│       │   └───hooks
│       ├───services
│       │   └───hooks
│       ├───stores
│       │   └───hooks
│       └───utilities
└───test
│   ├───app.test.js
```

## Requirements
* Node: [Download here](https://nodejs.org/en/download/)
* Please visit https://github.com/BestBuy/api-playground.
* Setup your local environment as explained in the “Getting Started” section.
* Please note that if you are using node JS version 14 or higher this extra command is needed following npm install command: `npm i sqlite3 -D`

## How to run tests
* Clone the repo
* cd to the directory
* Run `npm test`

### Test cases are found in tests folder
