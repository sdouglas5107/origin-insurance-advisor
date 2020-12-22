const { AUTO } = require('../../../shared/enum/InsuranceType');
const BaseHandler = require('../BaseHandler');

module.exports = class AutoInsuranceHandlers extends BaseHandler {
  diffOfYears(other) {
    const current = new Date().getFullYear();
    return current - other;
  }

  applyRules(userData, userRiskProfile) {
    if (userData.vehicle) {
      let autoRiskPoints = 0;
      if (this.diffOfYears(userData.vehicle.year) <= 5) {
        autoRiskPoints += 1;
      }

      userRiskProfile.addRiskPoints(AUTO, autoRiskPoints);
      return userRiskProfile;
    }
    userRiskProfile.makeIneligibleFor(AUTO);

    return userRiskProfile;
  }
};
