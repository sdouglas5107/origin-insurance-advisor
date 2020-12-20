const { Router } = require('express');
const healthRouter = require('./health');
const userRiskProfileRouter = require('./user-risk-profile');

const router = Router();

router.use(healthRouter);
router.use(userRiskProfileRouter);

module.exports = router;
