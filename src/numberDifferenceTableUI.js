import "tachyons";
import calculations from "./calculations";

const numberDifferenceTableUI = {
  container: null,
  selectMin: 3,
  selectMax: 20,
  inputWidth: 200,
  inputHeight: 35,
  gap: 100,
  sequenceLength: 0,
  btnBaseStyle:
    "pa3 mr2 sans-serif ba bw2 bg-transparent bg-animate pointer outline-0",
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
    const div = document.createElement("div");
    const fragment = document.createDocumentFragment();
    const width = this.inputWidth * amount + this.gap * (amount - 1);

    div.id = "theSequence";
    div.className = "overflow-hidden";
    div.style = `width: ${width}px;`;

    for (let i = 1; i <= amount; i++) {
      const input = document.createElement("input");
      const gap = i === amount ? 0 : this.gap;

      input.name = `number-${i}`;
      input.className = "dit ph2 sans-serif ba b--dashed outline-0";
      input.style = `width: ${this.inputWidth}px; height: ${
        this.inputHeight
      }px; margin-right: ${gap}px`;
      fragment.appendChild(input);
    }

    div.appendChild(fragment);
    this.generateActions();
    document.getElementById("theScroller").appendChild(div);
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
    this.container.insertBefore(div, this.container.firstChild);
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
    const inputs = [...document.querySelectorAll("#theSequence input")];
    const emptyInputs = inputs.filter(input => null || input.value === "");
    const numericInputValues = inputs.filter(
      input => null || Number.isInteger(Number(input.value)) === false
    );

    if (emptyInputs.length > 0 || numericInputValues.length > 0) {
      console.error("Empty inputs or not numbers");
      return;
    }
    this.generateDifferences(calculations.getSequence());
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
    const div = document.createElement("div");
    const fragment = document.createDocumentFragment();
    const rows = values.length;

    div.id = "theDifferences";

    for (let i = 0; i < rows; i++) {
      const divInner = document.createElement("div");

      divInner.id = `rows-${i}`;
      divInner.className = "mb2 flex";
      divInner.appendChild(this.generateRow(values[i]));
      fragment.appendChild(divInner);
    }

    div.appendChild(fragment);
    this.container.appendChild(div);
  },
  generateRow(values) {
    const limit = values.length;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < limit; i++) {
      const div = document.createElement("div");

      div.className = "pa3 mr2 w-10 sans-serif bg-light-gray";
      div.innerHTML = values[i];
      fragment.appendChild(div);
    }

    return fragment;
  }
};

export default numberDifferenceTableUI;
