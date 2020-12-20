const InsuranceType = require('../../shared/enum/InsuranceType');
const { ECONOMIC, REGULAR, RESPONSIBLE } = require('../../shared/enum/InsuranceTier');

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
    InsuranceType.values.forEach((insuranceType) => {
      const tier = this.getTierForScore(
        userRiskProfile[`${insuranceType}Score`],
      );
      userRiskProfile.setTierFor(insuranceType, tier);
    });

    return userRiskProfile.view();
  }
};
