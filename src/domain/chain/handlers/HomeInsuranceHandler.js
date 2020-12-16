module.exports = class HomeInsuranceHandler {
  setNext(handler) {
    this.next = handler;
  }
  processRiskProfile(userData, userRiskProfile) {
    if (!userData.house) {
      userRiskProfile.home = "ineligible";
    }
    if (userData.house.ownership_status === "mortgaged") {
      userRiskProfile.addRiskPoints("home", 1);
    }
    userRiskProfile.determineTierForInsurance("home");
    return this.next.processRiskProfile(userData, userRiskProfile);
  }
};
