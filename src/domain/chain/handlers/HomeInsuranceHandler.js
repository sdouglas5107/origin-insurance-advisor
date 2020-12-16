module.exports = class HomeInsuranceHandler {
  setNext(handler) {
    this.next = handler;
  }
  processRiskProfile(userData, userRiskProfile) {
    userRiskProfile.determineTierForInsurance("home");
    return this.next.processRiskProfile(userData, userRiskProfile);
  }
};
