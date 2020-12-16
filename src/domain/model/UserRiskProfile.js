const InsuranceTier = require("../vo/InsuranceTier");
const InsuranceType = require("../vo/InsuranceType");

module.exports = class UserRiskProfile {
  constructor() {
    this.updateRiskPoints();
  }

  updateRiskPoints(riskPoints = 0) {
    InsuranceType.stringValues.forEach((insuranceType) => {
      this[`${insuranceType}Score`] = riskPoints;
    });
  }

  calculateBaseScore(riskAnswers) {
    this.baseScore = riskAnswers.reduce((acc, answer) => acc + answer, 0);
    this.updateRiskPoints(this.baseScore);
  }

  makeIneligibleFor(insuranceType) {
    this[insuranceType] = InsuranceTier.INELIGIBLE;
  }

  addRiskPoints(insuranceType, riskPoints) {
    this[`${insuranceType}Score`] = this[`${insuranceType}Score`] + riskPoints;
  }

  setTierFor(insuranceType, tier) {
    if (this[insuranceType] === InsuranceTier.INELIGIBLE) {
      return;
    }
    this[insuranceType] = tier;
  }

  view() {
    return InsuranceType.stringValues.reduce((acc, insuranceType) => {
      acc[insuranceType] = this[insuranceType];
      return acc;
    }, {});
  }
};
