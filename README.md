![Logo](https://i.imgur.com/4O1TJBI.png)

# Description

A language e-learning system web application that users answers a group of words with a corresponding set of choices. Users can be able to interact with other users. Keeping track of their performance, as well as other people's performance. This project will also have its own administrator section, to manage categories as well as other user's information.

## Contributors

- [@johnpaul-sun](https://github.com/johnpaul-sun)

## Installation

Clone my-project with github

```bash
  git clone https://github.com/johnpaul-sun/e-learning-system.git
```

## Environment Variables

To run this project locally, you will need to add the following environment variables to .env file in the back-end folder.
If .env file does not exist just create a new one and add this ff:

```javascript
APP_NAME=Laravel
APP_ENV=local
APP_KEY= // Generate a new key
APP_DEBUG=true
APP_URL=http://back-end.test

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=els_db
DB_USERNAME=root
DB_PASSWORD=
```

Make sure to create a Database based on the DB_DATABASE value.

## Run Locally

After cloning the project

Go to the project directory

```bash
  cd e-learning-system
```

## Commands for running the Front End

From the Root folder install dependencies for the Front End

```bash
  cd client
  npm install
```

Start the Front End Server

```bash
  npm run start
```

## Commands for running the Back End

From the Root folder install dependencies for the Back End

```bash
  cd api
  composer install
```

Optimize the back end

```bash
  php artisan config:clear
  php artisan cache:clear
  php artisan route:clear
  php artisan optimize
  composer dump-autoload
```

Start the Back End Server

```bash
  php artisan serve
```

## Appendix

Any additional information goes here
