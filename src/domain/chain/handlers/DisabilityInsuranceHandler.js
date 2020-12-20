const { DISABILITY } = require('../../../shared/enum/InsuranceType');
const { MORTGAGED } = require('../../../shared/enum/OwnershipStatus');
const { MARRIED } = require('../../../shared/enum/MaritalStatus');

module.exports = class DisabilityInsuranceHandler {
  setNext(handler) {
    this.next = handler;
  }

  processRiskProfile(userData, userRiskProfile) {
    if (!userData.income || userData.age > 60) {
      userRiskProfile.makeIneligibleFor(DISABILITY);
    }
    let disabilityRiskPoints = 0;
    if (userData.house.ownership_status === MORTGAGED) {
      disabilityRiskPoints += 1;
    }
    if (userData.dependents) {
      disabilityRiskPoints += 1;
    }
    if (userData.marital_status === MARRIED) {
      disabilityRiskPoints -= 1;
    }
    userRiskProfile.addRiskPoints(DISABILITY, disabilityRiskPoints);

    return this.next.processRiskProfile(userData, userRiskProfile);
  }
};
