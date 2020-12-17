const { determineUserRiskProfileUseCase } = require('../ioc/container');

const create = (req, res) => {
  const userRiskProfile = determineUserRiskProfileUseCase.execute(req.body);

  res.json(userRiskProfile);
};

module.exports = { create };
