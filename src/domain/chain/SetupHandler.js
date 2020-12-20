const InsuranceType = require('../../shared/enum/InsuranceType');

module.exports = class SetupHandler {
  setNext(handler) {
    this.next = handler;
  }

  processRiskProfile(userData, userRiskProfile) {
    const baseScore = userData.risk_questions.reduce(
      (acc, answer) => acc + answer,
      0,
    );
    userRiskProfile.setBaseScore(baseScore);

    let riskPoints = 0;
    if (userData.age < 30) {
      riskPoints -= 2;
    } else if (userData.age <= 40) {
      riskPoints -= 1;
    }

    if (userData.income > 200000) {
      riskPoints -= 1;
    }

    InsuranceType
      .values
      .forEach((insurance) => userRiskProfile.addRiskPoints(insurance, riskPoints));

    return this.next.processRiskProfile(userData, userRiskProfile);
  }
};
