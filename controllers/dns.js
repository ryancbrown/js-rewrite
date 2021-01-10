const axios = require("axios"); 
const { v4: uuidv4 } = require('uuid');

const args = { 
  key: process.env.DNS, 
  format: "json",
  type: "A",
  unique_id: uuidv4(),
  value: "173.236.176.219"
}

module.exports = {
  call: (_req, res) => {
    let url = "https://api.dreamhost.com/?key=" + args.key; 
        url = url + "&cmd=dns-list_records"; 
        url = url + "&unique_id=" + args.unique_id;
        url = url + "&format=" + args.format;

    axios.get(url)
      .then(result => { 
        res.send(result.data);
      })

  },
  create: (req, res) => {  
    let url = "https://api.dreamhost.com/?key=" + args.key
        url = url + "&cmd=dns-add_record";
        url = url + "&record=" + req.body.url + ".ryanbrown.xyz";
        url = url + "&type=" + args.type;
        url = url + "&value=" + args.value;
        url = url + "&unique_id=" + args.unique_id;
        url = url + "&format=" + args.format;

    // Dreamhost API supports GET requests for subdomain creation 
    axios.get(url)
      .then(result => { 
        res.send(result.data);
      });
  }, 
  delete: (req,res) => { 
    let url = "https://api.dreamhost.com/?key=" + args.key
        url = url + "&cmd=dns-remove_record";
        url = url + "&record=" + req.body.url + ".ryanbrown.xyz";
        url = url + "&type=" + args.type;
        url = url + "&value=" + args.value;
        url = url + "&unique_id=" + args.unique_id;
        url = url + "&format=" + args.format;

    axios.get(url)
      .then(result => { 
        res.send(result.data);
      });
  }
}