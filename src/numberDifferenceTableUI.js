import "tachyons";
import calculations from "./calculations";
import solveSequence from "./solveSequence";

const numberDifferenceTableUI = {
  container: null,
  originalSequence: [],
  theDifferences: [],
  selectMin: 3,
  selectMax: 20,
  inputWidth: 120,
  inputHeight: 60,
  gap: 30,
  btnBaseStyle:
    "pa3 mr2 sans-serif dark-gray ba bw2 bg-transparent bg-animate pointer outline-0",
  init(element) {
    if (!element) {
      return;
    }
    this.container = element;
    this.container.innerHTML = "";
    this.generateSelect();
  },
  resetApp() {
    calculations.reset();
    this.originalSequence = [];
    this.theDifferences = [];
    this.clearApp();
    this.generateSelect();
  },
  clearApp() {
    this.container.innerHTML = "";
  },
  generateSelect() {
    const fragment = document.createDocumentFragment();
    const select = document.createElement("select");
    const selectLabel = document.createElement("p");
    const firstOption = document.createElement("option");

    firstOption.value = "-1";
    firstOption.innerHTML = "Select";
    select.className = "ml3 pa2 outline-0";
    select.appendChild(firstOption);

    for (let i = this.selectMin; i <= this.selectMax; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.innerHTML = i;
      select.appendChild(option);
    }

    selectLabel.className = "ma0 sans-serif";
    selectLabel.innerHTML = `Select sequence length (max ${this.selectMax})`;
    selectLabel.appendChild(select);
    select.addEventListener("change", this.selectHandler.bind(this));
    fragment.appendChild(selectLabel);
    this.container.appendChild(fragment);
  },
  selectHandler(event) {
    const n = Number(event.target.value);

    if (Number.isNaN(n) === true) {
      console.error("Value is not a number");
      return;
    }
    this.clearApp();
    this.generateScrollContainer();
    this.generateInputs(n);
    this.generateActions();
    this.generateInstructions();
  },
  generateScrollContainer() {
    const div = document.createElement("div");

    div.id = "theScroller";
    div.className = "overflow-x-auto overflow-y-hidden";
    this.container.appendChild(div);
  },
  generateInstructions() {
    const instructions = document.createElement("div");
    const sequenceLabel = document.createElement("p");

    sequenceLabel.className = "ma0 f3 lh-title sans-serif";
    sequenceLabel.innerHTML = "Please enter sequence into inputs below:";
    instructions.id = "theInstructions";
    instructions.className = "mb3";
    instructions.appendChild(sequenceLabel);
    this.container.insertBefore(instructions, this.container.childNodes[1]);
  },
  generateInputs(amount) {
    const div = document.createElement("div");
    const fragment = document.createDocumentFragment();
    const width = this.inputWidth * amount + this.gap * (amount - 1);

    div.id = "theSequence";
    div.className = "mb2 overflow-hidden";
    div.style = `width: ${width}px;`;

    for (let i = 1; i <= amount; i++) {
      const input = document.createElement("input");
      const gap = i === amount ? 0 : this.gap;

      input.name = `number-${i}`;
      input.type = "number";
      input.className =
        "ph2 tc sans-serif dark-gray bn bg-light-yellow outline-0";
      input.style = `width: ${this.inputWidth}px; height: ${
        this.inputHeight
      }px; margin-right: ${gap}px`;
      fragment.appendChild(input);
    }

    div.appendChild(fragment);
    document.getElementById("theScroller").appendChild(div);
  },
  generateActions() {
    const div = document.createElement("div");
    const fragment = document.createDocumentFragment();
    const calculateBtn = this.generateCalculateBtn();
    const solveBtn = this.generateSolveBtn();
    const resetBtn = this.generateResetBtn();

    div.id = "theActions";
    div.className = "pb4 mb4 flex bb bw2 b--black-20";
    fragment.appendChild(calculateBtn);
    fragment.appendChild(solveBtn);
    fragment.appendChild(resetBtn);
    div.appendChild(fragment);
    this.container.insertBefore(div, this.container.firstChild);
  },
  generateCalculateBtn() {
    const btn = document.createElement("button");

    btn.id = "calculateSequence";
    btn.className = `${this.btnBaseStyle} b--light-green hover-bg-light-green`;
    btn.innerHTML = "Calculate differences";
    btn.addEventListener("click", this.calculateHandler.bind(this));

    return btn;
  },
  calculateHandler() {
    const inputs = [...document.querySelectorAll("#theSequence input")];
    const emptyInputs = inputs.filter(input => null || input.value === "");
    const numericInputValues = inputs.filter(
      input => null || Number.isInteger(Number(input.value)) === false
    );

    if (emptyInputs.length > 0 || numericInputValues.length > 0) {
      console.error("Empty inputs or not numbers");
      return;
    }

    const sequence = inputs.map(input => Number(input.value));
    this.originalSequence = sequence;

    if (document.getElementById("theDifferences") !== null) {
      document.getElementById("theDifferences").remove();
    }

    if (document.getElementById("theSolutions") !== null) {
      document.getElementById("theSolutions").remove();
    }

    // this.generateDifferences(calculations.getSequence(sequence));
    this.renderDifferences(calculations.getSequence(sequence));
  },
  generateSolveBtn() {
    const btn = document.createElement("button");

    btn.id = "solveSequence";
    btn.className = `${this.btnBaseStyle} b--light-blue hover-bg-light-blue`;
    btn.innerHTML = "Solve sequence";
    btn.addEventListener("click", this.solveHandler.bind(this));

    return btn;
  },
  solveHandler() {
    if (
      this.originalSequence.length === 0 &&
      this.theDifferences.length === 0
    ) {
      console.error("Nothing to solve");
      return;
    }

    const solution = solveSequence.solve(
      this.originalSequence,
      this.theDifferences
    );
    this.generateSolution(solution);
  },
  generateSolution(solution) {
    const isDivergentClass = solution.isDivergent ? "bg-red" : "bg-green";
    const sequenceSolution = document.createElement("div");

    sequenceSolution.id = "sequenceSolution";
    sequenceSolution.className = `dit ph2 tc sans-serif white ${isDivergentClass}`;
    sequenceSolution.style = `width: ${this.inputWidth}px; margin-left: ${
      this.gap
    }px; line-height: ${this.inputHeight}px;`;
    sequenceSolution.innerHTML = solution.solvedSequenceValue;

    // Now modify the original sequence container. Only extending it's width and adding the solution value
    const theSequenceContainer = document.getElementById("theSequence");
    const newSequenceContainerWidth =
      theSequenceContainer.offsetWidth + (this.gap + this.inputWidth);

    theSequenceContainer.style = `width: ${newSequenceContainerWidth}px;`;

    theSequenceContainer.appendChild(sequenceSolution);

    // Now add the solutions for the remaining differences
    // this.addSolutionsToRows(solution.solvedDifferences, solution.isDivergent);
    document.getElementById("theDifferences").remove();
    const values = this.combineSolutionsWithDifferences(
      solution.solvedDifferences
    );
    this.generateRows("theSolutions", values, true, solution.isDivergent);
  },
  combineSolutionsWithDifferences(solution) {
    const depth = this.theDifferences.length;
    const newValues = [];

    for (let i = 0; i < depth; i++) {
      const sequence = this.theDifferences[i];
      const solutionVal = solution[i];

      sequence.push(solutionVal);
      newValues.push(sequence);
    }

    return newValues;
  },
  generateResetBtn() {
    const btn = document.createElement("button");

    btn.id = "resetSequence";
    btn.className = `${this.btnBaseStyle} b--light-red hover-bg-light-red`;
    btn.innerHTML = "Reset";
    btn.addEventListener("click", this.resetApp.bind(this));

    return btn;
  },
  renderDifferences(values) {
    this.theDifferences = values;
    this.generateRows("theDifferences", values, false, false);
  },
  generateRows(id, values, isSolution, isDivergent) {
    const div = document.createElement("div");
    const fragment = document.createDocumentFragment();
    const rows = values.length;

    div.id = id;

    for (let i = 0; i < rows; i++) {
      const rowResults = values[i];
      const divInner = document.createElement("div");
      // Padding is used to push the results to the left, so they sit centrally, and form a downward pyramid with the results
      const padding = (this.inputWidth / 2 + this.gap / 2) * (i + 1);
      const width =
        this.inputWidth * rowResults.length +
        this.gap * (rowResults.length - 1) +
        padding;

      divInner.id = `row${i + 1}`;
      divInner.className = "mb2 overflow-hidden";
      divInner.style = `width: ${width}px; padding-left: ${padding}px;`;
      divInner.appendChild(
        this.generateRow(rowResults, isSolution, isDivergent)
      );
      fragment.appendChild(divInner);
    }

    div.appendChild(fragment);
    document.getElementById("theScroller").appendChild(div);
  },
  generateRow(values, isSolution, isDivergent) {
    const isDivergentClass = isDivergent ? "bg-red" : "bg-green";
    const limit = values.length;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < limit; i++) {
      const div = document.createElement("div");
      const gap = i === limit - 1 ? 0 : this.gap;

      if (isSolution) {
        // Only apply to last item in a solution row
        if (i === limit - 1) {
          div.className = `dit ph2 tc sans-serif white ${isDivergentClass}`;
        } else {
          div.className = `dit ph2 tc sans-serif bg-light-gray`;
        }
      } else {
        div.className = `dit ph2 tc sans-serif bg-light-gray`;
      }
      div.style = `width: ${this.inputWidth}px; height: ${
        this.inputHeight
      }px; margin-right: ${gap}px; line-height: ${this.inputHeight}px;`;
      div.innerHTML = values[i];
      fragment.appendChild(div);
    }

    return fragment;
  }
};

export default numberDifferenceTableUI;
