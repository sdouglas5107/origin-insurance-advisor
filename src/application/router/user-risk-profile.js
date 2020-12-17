const { Router } = require('express');
const validator = require('express-joi-validation').createValidator({
  passError: true,
});

const controller = require('../controller/user-risk-profile');
const userDataSchema = require('../validation/UserDataSchema');

const path = '/user-risk-profile';
const router = Router();

router.post(path, validator.body(userDataSchema), controller.create);

module.exports = router;
