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
  },
  generateScrollContainer() {
    const div = document.createElement("div");

    div.id = "theScroller";
    div.className = "overflow-x-auto overflow-y-hidden";
    this.container.appendChild(div);
  },
  generateInputs(amount) {
    const sequenceLabel = document.createElement("p");
    const div = document.createElement("div");
    const fragment = document.createDocumentFragment();
    const width = this.inputWidth * amount + this.gap * (amount - 1);

    sequenceLabel.className = "ma0 mb3 f3 lh-title sans-serif";
    sequenceLabel.innerHTML = "Please enter sequence into inputs below:";

    div.id = "theSequence";
    div.className = "overflow-hidden";
    div.style = `width: ${width}px; margin: 0 auto 0.5rem`;

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

    div.appendChild(sequenceLabel);
    div.appendChild(fragment);
    this.generateActions();
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

    this.generateDifferences(calculations.getSequence(sequence));
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

    sequenceSolution.className = `dit ph2 tc sans-serif ${isDivergentClass}`;
    sequenceSolution.style = `width: ${this.inputWidth}; margin-left: ${
      this.gap
    }; line-height: ${this.inputHeight}px;`;
    sequenceSolution.innerHTML = solution.solvedSequenceValue;

    // Now modify the original sequence container. Only extending it's width and adding the solution value
    const theSequenceContainer = document.getElementById("theSequence");
    const newSequenceContainerWidth =
      theSequenceContainer.offsetWidth + (this.gap + this.inputWidth);

    theSequenceContainer.style = `width: ${newSequenceContainerWidth}px; margin: 0 auto 0.5rem`;

    theSequenceContainer.appendChild(sequenceSolution);
  },
  generateResetBtn() {
    const btn = document.createElement("button");

    btn.id = "resetSequence";
    btn.className = `${this.btnBaseStyle} b--light-red hover-bg-light-red`;
    btn.innerHTML = "Reset";
    btn.addEventListener("click", this.resetApp.bind(this));

    return btn;
  },
  generateDifferences(values) {
    this.theDifferences = values;
    const div = document.createElement("div");
    const fragment = document.createDocumentFragment();
    const rows = values.length;

    div.id = "theDifferences";
    div.className = "flex flex-column items-center";

    for (let i = 0; i < rows; i++) {
      const rowResults = values[i];
      const divInner = document.createElement("div");
      const width =
        this.inputWidth * rowResults.length +
        this.gap * (rowResults.length - 1);

      divInner.id = `rows-${i}`;
      divInner.className = "mb2 overflow-hidden";
      divInner.style = `width: ${width}px;`;
      divInner.appendChild(this.generateRow(rowResults));
      fragment.appendChild(divInner);
    }

    div.appendChild(fragment);
    document.getElementById("theScroller").appendChild(div);
  },
  generateRow(values) {
    const limit = values.length;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < limit; i++) {
      const div = document.createElement("div");
      const gap = i === limit - 1 ? 0 : this.gap;

      div.className = "dit ph2 tc sans-serif bg-light-gray";
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
