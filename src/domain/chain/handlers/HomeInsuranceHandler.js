const { HOME } = require('../../../shared/enum/InsuranceType');
const { MORTGAGED } = require('../../../shared/enum/OwnershipStatus');

module.exports = class HomeInsuranceHandler {
  setNext(handler) {
    this.next = handler;
  }

  processRiskProfile(userData, userRiskProfile) {
    if (!userData.house) {
      userRiskProfile.makeIneligibleFor(HOME);
    }

    let homeRiskPoints = 0;
    if (userData.house.ownership_status === MORTGAGED) {
      homeRiskPoints += 1;
    }

    userRiskProfile.addRiskPoints(HOME, homeRiskPoints);

    return this.next.processRiskProfile(userData, userRiskProfile);
  }
};
