const InsuranceTier = require('../../shared/enum/InsuranceTier');
const InsuranceType = require('../../shared/enum/InsuranceType');

module.exports = class UserRiskProfile {
  constructor() {
    this.setBaseScoreAndUpdateRiskPoints(0);
  }

  getScoreNameFor(insuranceType) {
    return `${insuranceType}Score`;
  }

  updateRiskPoints(riskPoints) {
    InsuranceType.values.forEach((insuranceType) => {
      const insuranceScore = this.getScoreNameFor(insuranceType);
      this[insuranceScore] = riskPoints;
    });
  }

  setBaseScoreAndUpdateRiskPoints(baseScore) {
    this.baseScore = baseScore;
    this.updateRiskPoints(this.baseScore);
  }

  makeIneligibleFor(insuranceType) {
    this[insuranceType] = InsuranceTier.INELIGIBLE;
  }

  addRiskPoints(insuranceType, riskPoints) {
    const insuranceScore = this.getScoreNameFor(insuranceType);
    this[insuranceScore] += riskPoints;
  }

  setTierFor(insuranceType, tier) {
    if (this[insuranceType] === InsuranceTier.INELIGIBLE) {
      return;
    }
    this[insuranceType] = tier;
  }

  view() {
    return InsuranceType.values.reduce((acc, insuranceType) => {
      acc[insuranceType] = this[insuranceType];
      return acc;
    }, {});
  }
};
