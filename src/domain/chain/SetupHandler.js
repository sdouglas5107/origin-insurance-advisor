module.exports = class SetupHandler {
  setNext(handler) {
    this.next = handler;
  }
  processRiskProfile(userData, userRiskProfile) {
    userRiskProfile.calculateBaseScore(userData.risk_questions);
    return this.next.processRiskProfile(userData, userRiskProfile);
  }
};
