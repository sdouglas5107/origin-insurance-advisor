module.exports = class SetupHandler {
  setNext(handler) {
    this.next = handler;
  }
  processRiskProfile(userData, userRiskProfile) {
    userRiskProfile.calculateBaseScore(userData.risk_questions);
    const insurances = ["home", "life", "auto", "disability"];

    let riskPoints = 0;
    if (userData.age < 30) {
      riskPoints -= 2;
    } else if (userData.age <= 40) {
      riskPoints -= 1;
    }

    if (userData.income > 200000) {
      riskPoints -= 1;
    }

    insurances.forEach((insurance) =>
      userRiskProfile.addRiskPoints(insurance, riskPoints)
    );
    return this.next.processRiskProfile(userData, userRiskProfile);
  }
};
