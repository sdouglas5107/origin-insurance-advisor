module.exports = class AutoInsuranceHandlers {
  setNext(handler) {
    this.next = handler;
  }
  processRiskProfile(userData, userRiskProfile) {
    userRiskProfile.determineTierForInsurance("auto");
    return this.next.processRiskProfile(userData, userRiskProfile);
  }
};
