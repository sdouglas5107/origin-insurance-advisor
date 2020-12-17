const UserRiskProfile = require('../model/UserRiskProfile');
const InsuranceClint = require('../chain/InsuranceClient');

module.exports = class DetermineUserRiskProfile {
  execute(userData) {
    const insuranceChain = InsuranceClint.buildHandlerChain();
    return insuranceChain.processRiskProfile(userData, new UserRiskProfile());
  }
};
