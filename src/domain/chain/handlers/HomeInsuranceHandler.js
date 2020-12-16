const { HOME } = require("../../vo/InsuranceType");
const { MORTGAGED } = require("../../vo/HouseOwnershipStatus");

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
      homeRiskPoints++;
    }

    userRiskProfile.addRiskPoints(HOME, homeRiskPoints);

    return this.next.processRiskProfile(userData, userRiskProfile);
  }
};
