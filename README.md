# Origin Insurance Advisor

A service that receives user profile data and determines user risk profile for insurances lines and suggests an insurance plan ("economic", "regular", "responsible") corresponding to his risk profile.

## Try It On Heroku

```
curl --location --request POST 'https://origin-insurance-advisor.herokuapp.com/user-risk-profile' \
--header 'Content-Type: application/json' \
--data-raw '{
    "age": 0,
    "dependents": 2,
    "house": {
        "ownership_status": "owned"
    },
    "income": 0,
    "marital_status": "married",
    "risk_questions": [
        0,
        1,
        0
    ],
    "vehicle": {
        "year": "2011"
    }
}'
```

## Running Locally

- Install Node Js `v10+`;
- Copy `.env.example` to file named `.env` and set the `PORT` env with the value you want;
- Run `npm install`;

### To Run Local Server

- Run `npm start`
- Try It:

```
curl --location --request POST 'http://localhost:8181/user-risk-profile' \
--header 'Content-Type: application/json' \
--data-raw '{
    "age": 0,
    "dependents": 2,
    "house": {
        "ownership_status": "owned"
    },
    "income": 0,
    "marital_status": "married",
    "risk_questions": [
        0,
        1,
        0
    ],
    "vehicle": {
        "year": "2011"
    }
}'
```

### To Run Unit Tests

- Run `npm test`

### To Run Coverage for Unit Tests

- Run `npm run test:coverage`

### To Run Functional Tests

- Run `npm run test:functional`

## Main Technical Decisions That Were Made

- I decided to develop this solution implementing TDD in order to map in a easy way the rules found on assignment page tho the business rules on domain.

- I also decided to use a DDD approach on code design in order to self contain the business rules on Domain layer and keep the domain apart/agnostic from other layers and make it easy to add other layers.

- My unit tests were made on top of domain use case, as a consequence my domain layer got 100% of code coverage.

- I also added functional tests in order to validate the integration between application layer and domain layer and also validate the behavior expected by external consumers.

- Last but no least, the behavior expected on assignment page made me think in a way of make this solution extensible on terms of adding new rules on a specific insurance or adding a new insurance line, etc.
Thinking of it, I decided to use Chain of Responsibility as a behavioral design pattern to handle insurance rules, where each handler of the chain takes care of a specific set of rules.