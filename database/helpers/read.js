const mysql = require('../database')

module.exports = {
  userByEmail: (req, _res) => {
    const data = req;
    console.log(data)
    const command = (
      `SELECT 
        uuid, 
        email,
        password
      FROM users
      WHERE email = ?`
    )

    function emailLookup(q, data) {
      return (
        new Promise((success, fail) => {
          mysql.query(q, [data], (error, results) => {
            if (error) { return fail(error); }
            else { return success(results); }
          });
        })
      );
    };

    return emailLookup(command, data).then(results => {
      console.log(results)
      return results.length === 1
        ? results
        : false
    }).catch(function (error) {
      throw error
    });
  }
}