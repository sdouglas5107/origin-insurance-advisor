module.exports = class DisabilityInsuranceHandler {
  setNext(handler) {
    this.next = handler;
  }
  processRiskProfile(userData, userRiskProfile) {
    if (!userData.income || userData.age > 60) {
      userRiskProfile.disability = "ineligible";
    }
    let disabilityRiskPoints = 0;
    if (userData.house.ownership_status === "mortgaged") {
      disabilityRiskPoints++;
    }
    if (userData.dependents) {
      disabilityRiskPoints++;
    }
    if (userData.marital_status === "married") {
      disabilityRiskPoints--;
    }
    userRiskProfile.addRiskPoints("disability", disabilityRiskPoints);
    userRiskProfile.determineTierForInsurance("disability");
    return this.next.processRiskProfile(userData, userRiskProfile);
  }
};
