const SetupHandler = require("./SetupHandler");
const ConsolidationHandler = require("./ConsolidationHandler");
const AutoInsuranceHandler = require("./handlers/AutoInsuranceHandler");
const HomeInsuranceHandler = require("./handlers/HomeInsuranceHandler");
const LifeInsuranceHandler = require("./handlers/LifeInsuranceHandler");
const DisabilityInsuranceHandler = require("./handlers/DisabilityInsuranceHandler");

module.exports = class InsuranceClient {
  static buildHandlerChain() {
    const consolidationHandler = new ConsolidationHandler();

    const autoInsuranceHandler = new AutoInsuranceHandler();
    autoInsuranceHandler.setNext(consolidationHandler);

    const homeInsuranceHandler = new HomeInsuranceHandler();
    homeInsuranceHandler.setNext(autoInsuranceHandler);

    const lifeInsuranceHandler = new LifeInsuranceHandler();
    lifeInsuranceHandler.setNext(homeInsuranceHandler);

    const disabilityInsuranceHandler = new DisabilityInsuranceHandler();
    disabilityInsuranceHandler.setNext(lifeInsuranceHandler);

    const setupHandler = new SetupHandler();
    setupHandler.setNext(disabilityInsuranceHandler);

    return setupHandler;
  }
};
