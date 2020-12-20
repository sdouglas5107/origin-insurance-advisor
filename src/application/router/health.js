const { Router } = require('express');

const path = '/health';
const router = Router();

router.get(path, (req, res) => {
  res.json({ application: 'Origin Insurance Advisor', status: 'running' });
});

module.exports = router;
