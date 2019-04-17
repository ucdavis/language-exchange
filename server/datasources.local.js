module.exports = {
  db: {
    debug: process.env.DB_DEBUG,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    host: process.env.DB_HOST
  }
};