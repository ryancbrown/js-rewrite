const axios = require("axios"); 
const { v4: uuidv4 } = require('uuid');

const args = { 
  key: process.env.DNS, 
  cmd: ["dns-list_records", "dns-add_record", "dns-remove_record"],
  format: "json",
  type: "A",
  unique_id: uuidv4(),
  value: "173.236.176.219"
};

const api_errors = { 
  "no_record": "subdomain_does_not_exist",
  "no_such_record": "subdomain_does_not_exist",
  "no_type": "server_error",
  "no_value": "server_error",
  // Unique add failure codes
  "invalid_record": "server_error",
  "invalid_type": "server_error",
  "invalid_value": "server_error",
  "no_such_zone": "server_error",
  "CNAME_must_be_only_record": "api_error",
  "CNAME_already_on_record": "api_error",
  "record_already_exists_not_editable": "api_error",
  "record_already_exists_remove_first": "duplicate_record",
  "internal_error_updating_zone": "api_error",
  "internal_error_could_not_load_zone": "api_error",
  "internal_error_could_not_add_record": "api_error",
  // Unique delete failure codes
  "no_such_type": "server_error",
  "no_such_value": "server_error",
  "not_editable": "api_error",
  "internal_error_could_not_destroy_record": "api_error",
  "internal_error_could_not_update_zone": "api_error",
};

// Dreamhost API for some reason does not support POST requests 
// for subdomain creation and deletion but GET is allowed
module.exports = {
  list: (_req, res) => {
    const dreamhostURL = module.exports.buildURL(args.key, args.cmd[0], args.unique_id, args.format);
    try {
      axios.get(dreamhostURL)
        .then(result => { 
          res.send(result.data);
        });
    } catch { 
      res.send("connection_to_dns_api_failed").status(400);
    };
  },
  create: (req, res) => {  
    const dreamhostURL = module.exports.buildURL(args.key, args.cmd[1], args.unique_id, args.format, req.body.url, args.type, args.value);
    console.log(dreamhostURL)
    try {
      axios.get(dreamhostURL)
        .then(result => { 
          if (result.data.result === 'success' ) {
            res.send(result.data.result);
          }; 

          if (result.data.result === 'error') { 
            if (api_errors.hasOwnProperty(result.data.data)) {
              res.send(api_errors[result.data.data])
            } else { 
              res.send("server_error");
            };  
          };
        });
    } catch { 
      res.json({ status: 400, code: "connection_to_dns_api_failed" }).status(400);
    };
  }, 
  delete: (req, res) => { 
    const dreamhostURL = module.exports.buildURL(args.key, args.cmd[2], args.unique_id, args.format, req.body.url, args.type, args.value);

    try { 
      axios.get(dreamhostURL)
        .then(result => { 
          if (result.data.result === 'success' ) {
            res.send(result.data.data); 
          };

          if (result.data.result === 'error') { 
            if (api_errors.hasOwnProperty(result.data.data)) {
              res.send(api_errors[result.data.data])
            } else { 
              res.send("server_error")
            };  
          };
        });
      } catch { 
        res.json({ status: 400, code: "connection_to_dns_api_failed" }).status(400);
      };
  }, 
  buildURL: (key, cmd, unique_id, format, record, type, value) => { 
    if (cmd === args.cmd[0]) { 
      let url = "https://api.dreamhost.com/?key=" + args.key; 
          url = url + cmd; 
          url = url + "&unique_id=" + unique_id;
          url = url + "&format=" + format;
      return url;
    } else { 
      let url = "https://api.dreamhost.com/?key=" + key
          url = url + "&cmd=" + cmd;
          url = url + "&record=" + record + ".ryanbrown.xyz";
          url = url + "&type=" + type;
          url = url + "&value=" + value;
          url = url + "&unique_id=" + unique_id;
          url = url + "&format=" + format;
      return url;
    };
  },
}