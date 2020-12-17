const InsuranceType = {
  HOME: 'home',
  AUTO: 'auto',
  LIFE: 'life',
  DISABILITY: 'disability',
};

InsuranceType.values = Object.keys(InsuranceType).map(
  (prop) => InsuranceType[prop],
);

module.exports = InsuranceType;
