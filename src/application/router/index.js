const { Router } = require('express');
const userRiskProfileRouter = require('./user-risk-profile');

const router = Router();

router.use(userRiskProfileRouter);

module.exports = router;
