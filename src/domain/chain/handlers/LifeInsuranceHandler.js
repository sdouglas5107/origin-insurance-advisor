const { LIFE } = require("../../vo/InsuranceType");
const { MARRIED } = require("../../vo/MaritalStatus");

module.exports = class LifeInsuranceHandler {
  setNext(handler) {
    this.next = handler;
  }
  processRiskProfile(userData, userRiskProfile) {
    if (userData.age > 60) {
      userRiskProfile.makeIneligibleFor(LIFE);
    }
    let lifeRiskPoints = 0;
    if (userData.dependents) {
      lifeRiskPoints++;
    }
    if (userData.marital_status === MARRIED) {
      lifeRiskPoints++;
    }
    userRiskProfile.addRiskPoints(LIFE, lifeRiskPoints);
    
    return this.next.processRiskProfile(userData, userRiskProfile);
  }
};
