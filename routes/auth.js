const router = require('express').Router();
const authenticate = require('../controllers/authenticate');

router
  .route('/')
  .post(authenticate.call);

module.exports = router;