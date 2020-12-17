const OwnershipStatus = {
  OWNED: 'owned',
  MORTGAGED: 'mortgaged',
};

OwnershipStatus.values = Object.keys(OwnershipStatus).map((key) => OwnershipStatus[key]);

module.exports = OwnershipStatus;
