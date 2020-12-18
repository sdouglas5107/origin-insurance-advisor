/* global describe, expect, it, beforeAll, afterAll */
const request = require('request-promise');
const app = require('../../../src/application/app');

const PORT = '8181';
const serverUrl = `http://localhost:${PORT}`;
let server;

describe('/user-risk-profile', () => {
  beforeAll(() => {
    server = app.listen(PORT);
  });

  afterAll(() => {
    server.close();
  });

  const userData = {
    age: 35,
    dependents: 2,
    house: { ownership_status: 'owned' },
    income: 0,
    marital_status: 'married',
    risk_questions: [0, 1, 0],
    vehicle: { year: 2018 },
  };

  describe('POST /user-risk-profile', () => {
    const options = {
      method: 'POST',
      json: true,
      uri: `${serverUrl}/user-risk-profile`,
      body: userData,
    };

    it('Should create user risk profile with success if input is valid', async () => {
      const expectedResult = {
        auto: 'regular',
        disability: 'ineligible',
        home: 'economic',
        life: 'regular',
      };
      const response = await request(options);
      expect(response).toEqual(expectedResult);
    });

    it('Should return a validation error if input has invalid data', async () => {
      try {
        await request({
          ...options,
          body: { ...userData, age: -1 },
        });
        throw Error('Not allowed to reach this line');
      } catch (e) {
        expect(e.message).toMatch(/ValidationError/);
      }
    });
  });
});
