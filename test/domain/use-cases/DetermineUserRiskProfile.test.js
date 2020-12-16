const DetermineUserRiskProfile = require("../../../src/domain/use-cases/DetermineUserRiskProfile");

describe("DetermineUserRiskProfile", () => {
  const determineUserRiskProfile = new DetermineUserRiskProfile();
  const userDataWithoutRiskImpact = {
    age: 41,
    house: { ownership_status: "owned" },
    income: 200001,
    vehicle: { year: 2014 },
    dependents: 0,
    marital_status: "single",
    risk_questions: [0, 0, 0],
  };

  describe("0. First, it calculates the base score by summing the answers from the risk questions, resulting in a number ranging from 0 to 3.", () => {
    test('Should set all insurance lines to "economic" if the sum of risk questions is 0', () => {
      const userRiskProfile = determineUserRiskProfile.execute(
        userDataWithoutRiskImpact
      );
      expect(userRiskProfile.auto).toBe("economic");
      expect(userRiskProfile.life).toBe("economic");
      expect(userRiskProfile.home).toBe("economic");
      expect(userRiskProfile.disability).toBe("economic");
    });

    test('Should set all insurance lines to "regular" if the sum of risk questions is 1', () => {
      const userRiskProfile = determineUserRiskProfile.execute({
        ...userDataWithoutRiskImpact,
        risk_questions: [1, 0, 0],
      });
      expect(userRiskProfile.auto).toBe("regular");
      expect(userRiskProfile.life).toBe("regular");
      expect(userRiskProfile.home).toBe("regular");
      expect(userRiskProfile.disability).toBe("regular");
    });

    test('Should set all insurance lines to "regular" if the sum of risk questions is 2', () => {
      const userRiskProfile = determineUserRiskProfile.execute({
        ...userDataWithoutRiskImpact,
        risk_questions: [1, 1, 0],
      });
      expect(userRiskProfile.auto).toBe("regular");
      expect(userRiskProfile.life).toBe("regular");
      expect(userRiskProfile.home).toBe("regular");
      expect(userRiskProfile.disability).toBe("regular");
    });

    test('Should set all insurance lines to "responsible" if the sum of risk questions is 3', () => {
      const userRiskProfile = determineUserRiskProfile.execute({
        ...userDataWithoutRiskImpact,
        risk_questions: [1, 1, 1],
      });
      expect(userRiskProfile.auto).toBe("responsible");
      expect(userRiskProfile.life).toBe("responsible");
      expect(userRiskProfile.home).toBe("responsible");
      expect(userRiskProfile.disability).toBe("responsible");
    });
  });

  describe.only("1. If the user doesn’t have income, vehicles or houses, she is ineligible for disability, auto, and home insurance, respectively.", () => {
    test("Should set disability as ineligible if user has no income", () => {
      const userRiskProfile = determineUserRiskProfile.execute({
        ...userDataWithoutRiskImpact,
        income: 0,
      });
      expect(userRiskProfile.disability).toBe("ineligible");
    });

    test("Should set auto as ineligible if user has no cars", () => {
      const userRiskProfile = determineUserRiskProfile.execute({
        ...userDataWithoutRiskImpact,
        vehicle: 0,
      });
      expect(userRiskProfile.auto).toBe("ineligible");
    });

    test("Should set home as ineligible if user has no houses", () => {
      const userRiskProfile = determineUserRiskProfile.execute({
        ...userDataWithoutRiskImpact,
        house: 0,
      });
      expect(userRiskProfile.home).toBe("ineligible");
    });
  });

  describe("2. If the user is over 60 years old, she is ineligible for disability and life insurance.", () => {
    test("Should set disability and life as ineligible if user has over 60 years old", () => {
      const userRiskProfile = determineUserRiskProfile.execute({ age: 61 });
      expect(userRiskProfile.life).toBe("ineligible");
      expect(userRiskProfile.disability).toBe("ineligible");
    });

    test("Should set disability and life as economic if user is between 41 and 59 years old", () => {
      const userRiskProfile = determineUserRiskProfile.execute(
        userDataWithoutRiskImpact
      );
      expect(userRiskProfile.life).toBe("economic");
      expect(userRiskProfile.disability).toBe("economic");
    });
  });

  describe("3. If the user is under 30 years old, deduct 2 risk points from all lines of insurance. If she is between 30 and 40 years old, deduct 1.", () => {
    test('Should set all lines of insurance as "economic" if user is under 30 years old', () => {
      const userRiskProfile = determineUserRiskProfile.execute({
        ...userDataWithoutRiskImpact,
        age: 29,
        risk_questions: [1, 1, 0],
      });
      expect(userRiskProfile.auto).toBe("economic");
      expect(userRiskProfile.home).toBe("economic");
      expect(userRiskProfile.life).toBe("economic");
      expect(userRiskProfile.disability).toBe("economic");
    });

    test('Should set all lines of insurance as "regular" if user is between 30 and 40 years old', () => {
      const userRiskProfile = determineUserRiskProfile.execute({
        ...userDataWithoutRiskImpact,
        age: 31,
        risk_questions: [1, 1, 0],
      });
      expect(userRiskProfile.auto).toBe("regular");
      expect(userRiskProfile.home).toBe("regular");
      expect(userRiskProfile.life).toBe("regular");
      expect(userRiskProfile.disability).toBe("regular");
    });

    test('Should set all lines of insurance as "responsible" if user is over 40 years old', () => {
      const userRiskProfile = determineUserRiskProfile.execute({
        ...userDataWithoutRiskImpact,
        age: 41,
        risk_questions: [1, 1, 1],
      });
      expect(userRiskProfile.auto).toBe("responsible");
      expect(userRiskProfile.home).toBe("responsible");
      expect(userRiskProfile.life).toBe("responsible");
      expect(userRiskProfile.disability).toBe("responsible");
    });
  });

  describe("4. If her income is above $200k, deduct 1 risk point from all lines of insurance.", () => {
    test('Should set all all lines of insurance as "regular" if user income is above 200k', () => {
      const userRiskProfile = determineUserRiskProfile.execute({
        ...userDataWithoutRiskImpact,
        income: 200001,
        risk_questions: [1, 1, 1],
      });
      expect(userRiskProfile.auto).toBe("regular");
      expect(userRiskProfile.home).toBe("regular");
      expect(userRiskProfile.life).toBe("regular");
      expect(userRiskProfile.disability).toBe("regular");
    });

    test('Should set all all lines of insurance as "responsible" if user income is 200k or less', () => {
      const userRiskProfile = determineUserRiskProfile.execute({
        ...userDataWithoutRiskImpact,
        income: 200000,
        risk_questions: [1, 1, 1],
      });
      expect(userRiskProfile.auto).toBe("responsible");
      expect(userRiskProfile.home).toBe("responsible");
      expect(userRiskProfile.life).toBe("responsible");
      expect(userRiskProfile.disability).toBe("responsible");
    });
  });

  describe("5. If the user's house is mortgaged, add 1 risk point to her home score and add 1 risk point to her disability score.", () => {
    test('Should set home and disability score as "economic" if user\'s house is owned', () => {
      const userRiskProfile = determineUserRiskProfile.execute(
        userDataWithoutRiskImpact
      );
      expect(userRiskProfile.home).toBe("economic");
      expect(userRiskProfile.disability).toBe("economic");
    });

    test('Should set home and disability score as "regular" if user\'s house is mortgaged', () => {
      const userRiskProfile = determineUserRiskProfile.execute({
        ...userDataWithoutRiskImpact,
        house: { ownership_status: "mortgaged" },
      });
      expect(userRiskProfile.home).toBe("regular");
      expect(userRiskProfile.disability).toBe("regular");
    });
  });

  describe("6. If the user has dependents, add 1 risk point to both the disability and life scores.", () => {
    test('Should set life and disability score as "economic" if user has no dependents', () => {
      const userRiskProfile = determineUserRiskProfile.execute(
        userDataWithoutRiskImpact
      );
      expect(userRiskProfile.life).toBe("economic");
      expect(userRiskProfile.disability).toBe("economic");
    });

    test('Should set life and disability score as "regular" if user has dependents', () => {
      const userRiskProfile = determineUserRiskProfile.execute({
        ...userDataWithoutRiskImpact,
        dependents: 1,
        risk_questions: [0, 0, 0],
      });
      expect(userRiskProfile.life).toBe("regular");
      expect(userRiskProfile.disability).toBe("regular");
    });
  });

  describe("7. If the user is married, add 1 risk point to the life score and remove 1 risk point from disability.", () => {
    test('Should set life and disability score to "economic" if user is not married', () => {
      const userRiskProfile = determineUserRiskProfile.execute(
        userDataWithoutRiskImpact
      );
      expect(userRiskProfile.life).toBe("economic");
      expect(userRiskProfile.disability).toBe("economic");
    });

    test('Should set life score to "regular" and disability score to "economic" if user is married', () => {
      const userRiskProfile = determineUserRiskProfile.execute({
        ...userDataWithoutRiskImpact,
        marital_status: "married",
      });
      expect(userRiskProfile.life).toBe("regular");
      expect(userRiskProfile.disability).toBe("economic");
    });
  });

  describe("8. If the user's vehicle was produced in the last 5 years, add 1 risk point to that vehicle’s score.", () => {
    test('Should set auto score as "economic" if user\'s vehicle was produced more than 5 years ago', () => {
      const userRiskProfile = determineUserRiskProfile.execute(
        userDataWithoutRiskImpact
      );
      expect(userRiskProfile.auto).toBe("economic");
    });

    test('Should set auto score as "regular" if user\'s vehicle was produced in last 5 years', () => {
      const userRiskProfile = determineUserRiskProfile.execute({
        ...userDataWithoutRiskImpact,
        vehicle: { year: 2015 },
      });
      expect(userRiskProfile.auto).toBe("regular");
    });
  });
});
