const InsuranceType = require('../vo/InsuranceType');
const { ECONOMIC, REGULAR, RESPONSIBLE } = require('../vo/InsuranceTier');

module.exports = class ConsolidationHandler {
  getTierForScore(score) {
    if (score < 1) {
      return ECONOMIC;
    }
    if (score < 3) {
      return REGULAR;
    }
    return RESPONSIBLE;
  }

  processRiskProfile(userData, userRiskProfile) {
    InsuranceType.stringValues.forEach((insuranceType) => {
      const tier = this.getTierForScore(
        userRiskProfile[`${insuranceType}Score`],
      );
      userRiskProfile.setTierFor(insuranceType, tier);
    });

    return userRiskProfile.view();
  }
};
