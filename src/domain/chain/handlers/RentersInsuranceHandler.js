const InsuranceTier = require('../../../shared/enum/InsuranceTier');
const InsuranceType = require('../../../shared/enum/InsuranceType');
const OwnershipStatus = require('../../../shared/enum/OwnershipStatus');
const BaseHandler = require('../BaseHandler');

module.exports = class RentersInsuranceHandler extends (
  BaseHandler
) {
  applyRules(userData, userRiskProfile) {
    if (!userData.house || userData.house.ownership_status !== OwnershipStatus.RENTED) {
      userRiskProfile.makeIneligibleFor(InsuranceType.RENTERS);
    }
    return userRiskProfile;
  }
};
