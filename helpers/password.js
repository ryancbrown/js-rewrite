const bcrypt = require("bcrypt"); 
const saltRounds = 12;

module.exports = { 
  encrypt: (req, _res) => { 
    const plain_text_password = req; 

    const hash = ( 
      new Promise((resolve, reject) => {
        bcrypt.hash(plain_text_password, saltRounds, (err, hash) => {
          if (err) { reject(err) }; 
          resolve(hash); 
        });
      })
    );

    return hash;
  },
  decrypt: async (req, _res) => { 
    const { plain_text_password, database_password } = req; 
    
    return ( 
      await bcrypt.compare(plain_text_password, database_password)
    );
  }
}