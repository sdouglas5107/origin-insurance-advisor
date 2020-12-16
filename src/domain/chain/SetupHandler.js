const InsuranceType = require("../vo/InsuranceType");

module.exports = class SetupHandler {
  setNext(handler) {
    this.next = handler;
  }
  processRiskProfile(userData, userRiskProfile) {
    userRiskProfile.calculateBaseScore(userData.risk_questions);

    let riskPoints = 0;
    if (userData.age < 30) {
      riskPoints -= 2;
    } else if (userData.age <= 40) {
      riskPoints --;
    }

    if (userData.income > 200000) {
      riskPoints --;
    }

    InsuranceType.stringValues.forEach((insurance) =>
      userRiskProfile.addRiskPoints(insurance, riskPoints)
    );
    return this.next.processRiskProfile(userData, userRiskProfile);
  }
};
