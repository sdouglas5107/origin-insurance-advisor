const InsuranceTier = require('../../shared/enum/InsuranceTier');
const InsuranceType = require('../../shared/enum/InsuranceType');

module.exports = class UserRiskProfile {
  constructor() {
    this.setBaseScore(0);
  }

  updateRiskPoints(riskPoints) {
    InsuranceType.values.forEach((insuranceType) => {
      this[`${insuranceType}Score`] = riskPoints;
    });
  }

  setBaseScore(baseScore) {
    this.baseScore = baseScore;
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
    return InsuranceType.values.reduce((acc, insuranceType) => {
      acc[insuranceType] = this[insuranceType];
      return acc;
    }, {});
  }
};
