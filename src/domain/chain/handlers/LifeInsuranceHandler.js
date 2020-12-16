module.exports = class LifeInsuranceHandler {
  setNext(handler) {
    this.next = handler;
  }
  processRiskProfile(userData, userRiskProfile) {
    if (userData.age > 60) {
      userRiskProfile.life = "ineligible";
    }
    let lifeRiskPoints = 0;
    if (userData.dependents) {
      lifeRiskPoints++;
    }
    if(userData.marital_status === 'married'){
      lifeRiskPoints++;
    }
    userRiskProfile.addRiskPoints("life", lifeRiskPoints);
    userRiskProfile.determineTierForInsurance("life");
    return this.next.processRiskProfile(userData, userRiskProfile);
  }
};
