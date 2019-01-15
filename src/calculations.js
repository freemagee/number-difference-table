const calculations = {
  theSequence: [],
  getSequence() {
    // TODO: Deal with empty inputs
    const inputs = [...document.querySelectorAll("input")];
    const inputValues = [];

    inputs.forEach(input => {
      inputValues.push(input.value * 1);
    });

    // Push the first array of values into theSequence
    //this.theSequence.push(inputValues);
    // Use the array of values to calculate differences
    this.calculateSequence(inputValues);

    return this.returnTheSequence();
  },
  calculateSequence(values) {
    const subSequence = [];
    const sequenceLength = values.length;

    for (let i = 0; i < sequenceLength - 1; i++) {
      const calc = this.calculateDifference(values[i], values[i + 1]);
      subSequence.push(calc);
    }

    // Push the new subsequence into the higher level theSequence
    this.theSequence.push(subSequence);

    // Recursive function. If the values in the array are not identical, continue
    if (this.isIdentical(subSequence) !== true) {
      this.calculateSequence(subSequence);
    }
  },
  calculateDifference(a, b) {
    return b - a;
  },
  reset() {
    this.theSequence = [];
  },
  isIdentical(array) {
    for(var i = 0; i < array.length - 1; i++) {
        if(array[i] !== array[i+1]) {
            return false;
        }
    }
    return true;
  },
  returnTheSequence() {
    return this.theSequence;
  }
};

export default calculations;