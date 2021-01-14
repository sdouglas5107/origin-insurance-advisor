const InitialHandler = require('./InitialHandler');
const ConsolidationHandler = require('./ConsolidationHandler');
const AutoInsuranceHandler = require('./handlers/AutoInsuranceHandler');
const HomeInsuranceHandler = require('./handlers/HomeInsuranceHandler');
const LifeInsuranceHandler = require('./handlers/LifeInsuranceHandler');
const DisabilityInsuranceHandler = require('./handlers/DisabilityInsuranceHandler');
const RentersInsuranceHandler = require('./handlers/RentersInsuranceHandler');

module.exports = class InsuranceClient {
  static buildHandlerChain() {
    const consolidationHandler = new ConsolidationHandler();

    const rentersInsuranceHandler = new RentersInsuranceHandler();
    rentersInsuranceHandler.setNext(consolidationHandler);

    const autoInsuranceHandler = new AutoInsuranceHandler();
    autoInsuranceHandler.setNext(rentersInsuranceHandler);

    const homeInsuranceHandler = new HomeInsuranceHandler();
    homeInsuranceHandler.setNext(autoInsuranceHandler);

    const lifeInsuranceHandler = new LifeInsuranceHandler();
    lifeInsuranceHandler.setNext(homeInsuranceHandler);

    const disabilityInsuranceHandler = new DisabilityInsuranceHandler();
    disabilityInsuranceHandler.setNext(lifeInsuranceHandler);

    const initialHandler = new InitialHandler();
    initialHandler.setNext(disabilityInsuranceHandler);

    return initialHandler;
  }
};
