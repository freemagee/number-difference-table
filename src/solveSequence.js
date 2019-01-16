const solveSequence = {
  solve(originalSequence, theDifferences) {
    const isDivergent = this.isDivergent(
      theDifferences[theDifferences.length - 1]
    );
    const solvedDifferences = this.solveTheDifferences(theDifferences);
    const solvedSequenceValue = this.solveTheOriginal(
      originalSequence[originalSequence.length - 1],
      solvedDifferences[solvedDifferences.length - 1]
    );

    return {
      isDivergent,
      solvedDifferences,
      solvedSequenceValue
    };
  },
  solveTheDifferences(theDifferences) {
    const lines = theDifferences.length;
    const newValues = [];
    let diff = 0;

    for (let i = lines; i > 0; i--) {
      const lastVal =
        theDifferences[i - 1].length === 0
          ? theDifferences[i - 1]
          : theDifferences[i - 1][theDifferences[i - 1].length - 1];

      newValues.push(lastVal + diff);
      diff = lastVal;
    }

    return newValues;
  },
  solveTheOriginal(original, difference) {
    return original + difference;
  },
  isDivergent(lastCommonDifference) {
    const lcd = lastCommonDifference[0];

    if (lcd === 1 || lcd < 0) {
      return true;
    }

    return false;
  }
};

export default solveSequence;
