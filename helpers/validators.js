const bcrypt = require("bcrypt"); 

module.exports = { 
  email: (req, _res) => { 
    return (
      /\S+@\S+\.\S+/.test(req)
    );
  }, 
  password: (req, _res) => { 
    return ( 
      // 8 digits: 1 capital, 1 number
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(req)
    )
  }, 
}