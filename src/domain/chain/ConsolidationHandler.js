module.exports = class ConsolidationHandler {
  processRiskProfile(userData, userRiskProfile) {
    return userRiskProfile.view();
  }
};
