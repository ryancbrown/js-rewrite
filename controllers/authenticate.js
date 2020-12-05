const { v4: uuidv4 } = require('uuid');
const pw = require("../helpers/password");
const validate = require("../helpers/validators");

// Database 
const find = require("../database/helpers/read");
const insert = require("../database/helpers/insert");

const message = { 
  login_success: "access_granted",
  login_failed: "access_denied", 
  invalid: "Invalid email or password"
}

module.exports = {
  call: async (req, res) => { 
    const { email, password, type } = req.body;
    const validated = validate.email(email) && validate.password(password);
 
    if (type === "sign-in") { 
      const isUser = await module.exports.signIn({ email, password });

      if (isUser === "No user") { 
        return res.json({ 
          status: 403, 
          message: message.login_failed, 
          error: { 
            message: message.invalid
          }
        });
      }

      if (!isUser) { 
        return res.json({ 
          status: 403, 
          message: message.login_failed, 
          error: { 
            message: message.invalid
          }
        });
      } 

      return res.json({ 
        status: 200, 
        message: message.login_success, 
        error: { 
          message: null
        }
      });      
    };

    if (validated && type === "register") { 
      const newUser = await module.exports.create({ email, password });
    };
  }, 
  signIn: async (req, _res) => { 
    const { email, password } = req;
    const isUser = await find.userByEmail(email);

    if (!isUser) { 
      return "No user";
    }

    return await pw.decrypt({ plain_text_password: password, database_password: isUser[0].password });
  },
  create: async (req, _res) => { 
    const uuid = uuidv4()
    const { email, password } = req;
    const encrypted_password = await pw.encrypt(password);

    const insertUser = await insert.user([uuid, email, encrypted_password, "user"])
    
    if (insertUser) { 
      return "Logged in"
    };

    if (!insertUser) { 
      return "Create user failed"
    }
  }
}