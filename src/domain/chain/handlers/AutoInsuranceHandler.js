module.exports = class AutoInsuranceHandlers {
  setNext(handler) {
    this.next = handler;
  }
  processRiskProfile(userData, userRiskProfile) {
    if (!userData.vehicle) {
      userRiskProfile.auto = "ineligible";
    }
    userRiskProfile.determineTierForInsurance("auto");
    return this.next.processRiskProfile(userData, userRiskProfile);
  }
};
