module.exports = class UserRiskProfile {
  constructor() {
    this.updateRiskPoints();
  }

  updateRiskPoints(points = 0) {
    this.homeRiskPoints = points;
    this.autoRiskPoints = points;
    this.lifeRiskPoints = points;
    this.disabilityRiskPoints = points;
  }

  calculateBaseScore(riskAnswers) {
    this.baseScore = riskAnswers.reduce((acc, answer) => acc + answer, 0);
    this.updateRiskPoints(this.baseScore);
  }

  addRiskPoints(insurance, riskPoints) {
    this[`${insurance}RiskPoints`] =
      this[`${insurance}RiskPoints`] + riskPoints;
  }

  getTierForScore(score) {
    if (score < 1) {
      return "economic";
    }
    if (score < 3) {
      return "regular";
    }
    return "responsible";
  }

  determineTierForInsurance(insurance) {
    this[insurance] =
      this[insurance] || this.getTierForScore(this[`${insurance}RiskPoints`]);
  }

  view() {
    return {
      home: this.home,
      auto: this.auto,
      life: this.life,
      disability: this.disability,
    };
  }
};
