module.exports = class HomeInsuranceHandler {
  setNext(handler) {
    this.next = handler;
  }
  processRiskProfile(userData, userRiskProfile) {
    if (!userData.house) {
      userRiskProfile.home = "ineligible";
    }
    userRiskProfile.determineTierForInsurance("home");
    return this.next.processRiskProfile(userData, userRiskProfile);
  }
};
