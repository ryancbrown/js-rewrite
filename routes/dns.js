const router = require('express').Router();
const dns = require('../controllers/dns');

router
  .route('/')
  .get(dns.call);

router
  .route('/create')
  .post(dns.create);

router
  .route('/delete')
  .post(dns.delete);

module.exports = router;