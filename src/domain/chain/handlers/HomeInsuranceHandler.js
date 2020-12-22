const { HOME } = require('../../../shared/enum/InsuranceType');
const { MORTGAGED } = require('../../../shared/enum/OwnershipStatus');
const BaseHandler = require('../BaseHandler');

module.exports = class HomeInsuranceHandler extends BaseHandler {
  applyRules(userData, userRiskProfile) {
    if (userData.house) {
      let homeRiskPoints = 0;
      if (userData.house.ownership_status === MORTGAGED) {
        homeRiskPoints += 1;
      }

      userRiskProfile.addRiskPoints(HOME, homeRiskPoints);
      return userRiskProfile;
    }

    userRiskProfile.makeIneligibleFor(HOME);
    return userRiskProfile;
  }
};
