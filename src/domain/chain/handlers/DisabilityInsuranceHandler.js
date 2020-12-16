module.exports = class DisabilityInsuranceHandler {
  setNext(handler) {
    this.next = handler;
  }
  processRiskProfile(userData, userRiskProfile) {
    if (!userData.income || userData.age > 60) {
      userRiskProfile.disability = "ineligible";
    }
    if(userData.house.ownership_status === 'mortgaged'){
      userRiskProfile.addRiskPoints("disability", 1);
    }
    userRiskProfile.determineTierForInsurance("disability");
    return this.next.processRiskProfile(userData, userRiskProfile);
  }
};
