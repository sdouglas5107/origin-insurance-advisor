const InsuranceType = {
  HOME: 'home',
  AUTO: 'auto',
  LIFE: 'life',
  DISABILITY: 'disability',
  UMBRELLA: 'umbrella',
  RENTERS: 'renters',
};

InsuranceType.values = Object.keys(InsuranceType).map(
  (prop) => InsuranceType[prop],
);

module.exports = InsuranceType;
