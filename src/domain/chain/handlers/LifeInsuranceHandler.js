const { LIFE } = require('../../../shared/enum/InsuranceType');
const { MARRIED } = require('../../../shared/enum/MaritalStatus');
const BaseHandler = require('../BaseHandler');

module.exports = class LifeInsuranceHandler extends BaseHandler {
  applyRules(userData, userRiskProfile) {
    if (userData.age > 60) {
      userRiskProfile.makeIneligibleFor(LIFE);
    }
    let lifeRiskPoints = 0;
    if (userData.dependents) {
      lifeRiskPoints += 1;
    }
    if (userData.marital_status === MARRIED) {
      lifeRiskPoints += 1;
    }
    userRiskProfile.addRiskPoints(LIFE, lifeRiskPoints);

    return userRiskProfile;
  }
};
