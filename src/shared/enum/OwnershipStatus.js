const OwnershipStatus = {
  OWNED: 'owned',
  MORTGAGED: 'mortgaged',
  RENTED: 'rented',
};

OwnershipStatus.values = Object.keys(OwnershipStatus).map((key) => OwnershipStatus[key]);

module.exports = OwnershipStatus;
