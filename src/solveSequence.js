const solveSequence = {
  solve(originalSequence, theDifferences) {
    const sequenceIsDivergent = this.isDivergent(
      theDifferences[theDifferences.length - 1]
    );
    console.log(sequenceIsDivergent);
    this.solveTheDifferences(theDifferences);
  },
  solveTheDifferences(theDifferences) {
    const lines = theDifferences.length;
    const lastValues = [];

    for (let i = lines; i > 0; i--) {
      const lastVal =
        theDifferences[i - 1].length === 0
          ? theDifferences[i - 1]
          : theDifferences[i - 1][theDifferences[i - 1].length - 1];

      lastValues.push(lastVal);
    }

    console.log(lastValues);
  },
  isDivergent(lastCommonDifference) {
    const lcd = lastCommonDifference[0];

    if (lcd === 1 || lcd < 0) {
      return "You divergent sob";
    }

    return "Good sequence";
  }
};

export default solveSequence;
