const InsuranceType = require('../../shared/enum/InsuranceType');
const {
  ECONOMIC,
  REGULAR,
  RESPONSIBLE,
} = require('../../shared/enum/InsuranceTier');
const BaseHandler = require('./BaseHandler');
const InsuranceTier = require('../../shared/enum/InsuranceTier');

module.exports = class ConsolidationHandler extends (
  BaseHandler
) {
  getTierForScore(score) {
    if (score < 1) {
      return ECONOMIC;
    }
    if (score < 3) {
      return REGULAR;
    }
    return RESPONSIBLE;
  }

  applyRules(userData, userRiskProfile) {
    InsuranceType.values.forEach((insuranceType) => {
      const tier = this.getTierForScore(
        userRiskProfile[`${insuranceType}Score`],
      );
      userRiskProfile.setTierFor(insuranceType, tier);
    });

    const userProfile = userRiskProfile.view();

    const isEligible = Object.keys(userProfile)
      .map((key) => ({ key, value: userProfile[key] }))
      .filter((insurance) => insurance.key !== InsuranceType.UMBRELLA)
      .some((insurance) => insurance.value === InsuranceTier.ECONOMIC);

    if (!isEligible) {
      userProfile.umbrella = InsuranceTier.INELIGIBLE;
    }

    return userProfile;
  }
};
