const solveSequence = {
  solve(originalSequence, theDifferences) {
    const isDivergent = this.isDivergent(
      theDifferences[theDifferences.length - 1]
    );
    const lastValues = this.solveTheDifferences(theDifferences);
    const solvedDifferences = this.calculateNewValues(lastValues);
    const solvedSequenceValue = this.solveTheOriginal(
      originalSequence[originalSequence.length - 1],
      solvedDifferences[0]
    );

    return {
      isDivergent,
      solvedDifferences,
      solvedSequenceValue
    };
  },
  solveTheDifferences(theDifferences) {
    const lines = theDifferences.length;
    const lastValues = [];

    for (let i = lines; i > 0; i--) {
      const diffArray = theDifferences[i - 1];
      const lastVal =
        diffArray.length > 1 ? diffArray[diffArray.length - 1] : diffArray[0];
      lastValues.push(lastVal);
    }

    return lastValues;
  },
  calculateNewValues(lastValues) {
    const newValues = [];
    const limit = lastValues.length;
    let sum = 0;

    for (let i = 0; i < limit; i++) {
      if (i === 0) {
        newValues.push(lastValues[i]);
        sum = lastValues[i];
      } else {
        newValues.push(lastValues[i] + sum);
        sum = lastValues[i] + sum;
      }
    }

    // It is better if the array is in descending order
    return newValues.reverse();
  },
  solveTheOriginal(original, difference) {
    return original + difference;
  },
  isDivergent(lastCommonDifference) {
    return false || lastCommonDifference.length === 1;
  }
};

export default solveSequence;
