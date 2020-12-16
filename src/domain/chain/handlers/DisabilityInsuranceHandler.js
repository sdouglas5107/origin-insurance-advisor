const { DISABILITY } = require("../../vo/InsuranceType");
const { MORTGAGED } = require("../../vo/HouseOwnershipStatus");
const { MARRIED } = require("../../vo/MaritalStatus");

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
      disabilityRiskPoints++;
    }
    if (userData.dependents) {
      disabilityRiskPoints++;
    }
    if (userData.marital_status === MARRIED) {
      disabilityRiskPoints--;
    }
    userRiskProfile.addRiskPoints(DISABILITY, disabilityRiskPoints);
    
    return this.next.processRiskProfile(userData, userRiskProfile);
  }
};
