module.exports = class AutoInsuranceHandlers {
  setNext(handler) {
    this.next = handler;
  }

  diffOfYears(other) {
    const current = new Date().getFullYear();
    return current - other;
  }

  processRiskProfile(userData, userRiskProfile) {
    if (!userData.vehicle) {
      userRiskProfile.auto = "ineligible";
    }

    let autoRiskPoints = 0;
    if (this.diffOfYears(userData.vehicle.year) <= 5) {
      autoRiskPoints++;
    }

    userRiskProfile.addRiskPoints("auto", autoRiskPoints);
    userRiskProfile.determineTierForInsurance("auto");
    
    return this.next.processRiskProfile(userData, userRiskProfile);
  }
};
