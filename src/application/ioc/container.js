const DetermineUserRiskProfile = require('../../domain/use-cases/DetermineUserRiskProfile');

module.exports = {
  determineUserRiskProfileUseCase: new DetermineUserRiskProfile(),
};
