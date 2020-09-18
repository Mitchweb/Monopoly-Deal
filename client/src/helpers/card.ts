interface ISet {
  size: number;
  rent: number[];
}

const sets: { [index: number]: ISet } = {
  0: {
    size: 2,
    rent: [1, 2]
  },
  1: {
    size: 3,
    rent: [1, 2, 3]
  },
  2: {
    size: 3,
    rent: [1, 2, 4]
  },
  3: {
    size: 3,
    rent: [1, 3, 5]
  },
  4: {
    size: 3,
    rent: [2, 3, 6]
  },
  5: {
    size: 3,
    rent: [2, 4, 6]
  },
  6: {
    size: 3,
    rent: [2, 4, 7]
  },
  7: {
    size: 2,
    rent: [3, 8]
  },
  8: {
    size: 4,
    rent: [1, 2, 3, 4]
  },
  9: {
    size: 2,
    rent: [1, 2]
  }
};

export default sets;
