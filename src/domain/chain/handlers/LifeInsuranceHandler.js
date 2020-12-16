module.exports = class LifeInsuranceHandler {
  setNext(handler) {
    this.next = handler;
  }
  processRiskProfile(userData, userRiskProfile) {
    userRiskProfile.determineTierForInsurance('life')
    return this.next.processRiskProfile(userData, userRiskProfile);
  }
};
