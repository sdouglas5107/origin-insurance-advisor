module.exports = class DisabilityInsuranceHandler {
  setNext(handler) {
    this.next = handler;
  }
  processRiskProfile(userData, userRiskProfile) {
    userRiskProfile.determineTierForInsurance("disability");
    return this.next.processRiskProfile(userData, userRiskProfile);
  }
};
