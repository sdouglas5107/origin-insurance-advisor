const MaritalStatus = {
  SINGLE: 'single',
  MARRIED: 'married',
};
MaritalStatus.values = Object.keys(MaritalStatus).map((key) => MaritalStatus[key]);

module.exports = MaritalStatus;
