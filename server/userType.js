
const sqlite3 = require('sqlite3').verbose();

function getUserType(req, res, next, callback, cas_user) {
  let db = new sqlite3.Database('./server/db/dev.sqlite3');
  let sql = `SELECT user_type FROM partner where cas_user = ?`;
  var user_type;
  
  db.get(sql, [cas_user], (err, result) => {
    if (err) {
      return res.json({ errors: ['Could not retrieve data'] });
    }
    user_type = result.user_type
     callback(req, res, next, user_type)
  });
  
  db.close();
}


module.exports = getUserType;