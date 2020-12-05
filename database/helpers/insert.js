const mysql = require('../database')

module.exports = {
  user: (req, _res) => {
    const data = req;
    const command = (
      `INSERT INTO users (uuid, email, password, roles) 
       VALUES (?);`
    );

    function insertUser(q, data) {
      return (
        new Promise((success, fail) => {
          mysql.query(q, [data], (error, results) => {
            if (error) { return fail(error) }
            else { return success(results) };
          });
        })
      );
    }

    return (
      insertUser(command, data)
        .then(stored => {
          return true;
        })
        .catch(err => {
          return false;
        })
    );
  },
}
