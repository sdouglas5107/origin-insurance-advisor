const { Router } = require('express');
const controller = require('../controller/user-risk-profile');

const path = '/user-risk-profile';
const router = Router();

router.post(path, controller.create);

module.exports = router;
