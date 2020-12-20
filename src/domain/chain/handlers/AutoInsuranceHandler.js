const { AUTO } = require('../../../shared/enum/InsuranceType');

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
      userRiskProfile.makeIneligibleFor(AUTO);
    }

    let autoRiskPoints = 0;
    if (this.diffOfYears(userData.vehicle.year) <= 5) {
      autoRiskPoints += 1;
    }

    userRiskProfile.addRiskPoints(AUTO, autoRiskPoints);

    return this.next.processRiskProfile(userData, userRiskProfile);
  }
};
