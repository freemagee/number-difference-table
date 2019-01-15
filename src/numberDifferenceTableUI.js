import "tachyons";
import calculations from "./calculations.js";

const numberDifferenceTableUI = {
  container: null,
  selectMax: 20,
  sequenceLength: 0,
  btnBaseStyle: "pa3 mr2 sans-serif ba bw2 bg-transparent bg-animate pointer outline-0",
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
    select.className = "ml3 pa2";
    select.appendChild(firstOption);

    for (let i = 2; i <= this.selectMax; i++) {
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
    this.clearApp();
    this.generateInputs(event.target.value);
  },
  generateInputs(amount) {
    const div = document.createElement("div");
    const fragment = document.createDocumentFragment();

    div.id = "theSequence";
    div.className = "mb2 flex";

    for (let i = 1; i <= amount; i++) {
      const input = document.createElement("input");
      input.name = `number-${i}`;
      input.className = "pa3 mr2 w-10 sans-serif ba b--dashed outline-0";
      fragment.appendChild(input);
    }

    div.appendChild(fragment);
    this.generateActions();
    this.container.appendChild(div);
  },
  generateActions() {
    const div = document.createElement("div");
    const fragment = document.createDocumentFragment();
    const calculateBtn = this.generateCalculateBtn();
    const resetBtn = this.generateResetBtn();

    div.id = "theActions";
    div.className = "pb5 flex";
    fragment.appendChild(calculateBtn);
    fragment.appendChild(resetBtn);
    div.appendChild(fragment);
    this.container.appendChild(div);
  },
  generateCalculateBtn() {
    const btn = document.createElement("button");

    btn.id = "calculateSequence";
    btn.className = `${this.btnBaseStyle} b--light-green hover-bg-light-green`;
    btn.innerHTML = "Calculate";
    btn.addEventListener("click", this.calculateHandler.bind(this));

    return btn;
  },
  calculateHandler() {
    this.generateDifferences(calculations.getSequence());
  },
  generateResetBtn() {
    const btn = document.createElement("button");
    const btnBaseStyle = "";

    btn.id = "resetSequence";
    btn.className = `${this.btnBaseStyle} b--light-red hover-bg-light-red`;
    btn.innerHTML = "Reset";
    btn.addEventListener("click", this.resetApp.bind(this));

    return btn;
  },
  generateDifferences(values) {
    const div = document.createElement("div");
    const fragment = document.createDocumentFragment();
    const rows = values.length;

    div.id = "theDifferences";

    for (let i = 0; i < rows; i++) {
      let div = document.createElement("div");

      div.id = `rows-${i}`;
      div.className = "mb2 flex";
      div.appendChild(this.generateRow(values[i]));
      fragment.appendChild(div);
    }

    div.appendChild(fragment);
    this.container.appendChild(div);
  },
  generateRow(values) {
    const limit = values.length;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < limit; i++) {
      let div = document.createElement("div");

      div.className = "pa3 mr2 w-10 sans-serif bg-light-gray";
      div.innerHTML = values[i];
      fragment.appendChild(div);
    }

    return fragment;
  }
};

export default numberDifferenceTableUI;