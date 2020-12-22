module.exports = class BaseHandler {
  setNext(handler) {
    this.next = handler;
  }

  applyRules() {
    throw Error('It is supposed to be abstract');
  }

  processRiskProfile(userData, userRiskProfile) {
    const modifiedUserRiskProfile = this.applyRules(userData, userRiskProfile);
    if (!this.next) {
      return modifiedUserRiskProfile;
    }
    return this.next.processRiskProfile(userData, modifiedUserRiskProfile);
  }
};
