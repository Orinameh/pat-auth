
module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": "127.0.0.1",
    "dialect": "mysql",
    "secret": process.env.SECRET
  },
  "test": {
    "username": process.env.DB_USER_TEST,
    "password": process.env.DB_PASS_TEST,
    "database": process.env.DB_NAME_TEST,
    "host": "127.0.0.1",
    "dialect": "mysql",
    "secret": process.env.SECRET
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
