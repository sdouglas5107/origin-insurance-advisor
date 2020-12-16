module.exports = class LifeInsuranceHandler {
  setNext(handler) {
    this.next = handler;
  }
  processRiskProfile(userData, userRiskProfile) {
    if (userData.age > 60) {
      userRiskProfile.life = "ineligible";
    }
    userRiskProfile.determineTierForInsurance("life");
    return this.next.processRiskProfile(userData, userRiskProfile);
  }
};
