const technologiesSelect = document.querySelector(
  "#calculator-form-technologies"
); //извлекаем из html нужный селектор
const technologiesMultiSelect = new Choices(technologiesSelect, {
  allowSearch: false,
  silent: false,
  renderChoiceLimit: -1,
  maxItemCount: -1,
  removeItems: true,
  removeItemButton: true,
  editItems: false,
  duplicateItemsAllowed: false,
  delimiter: ",",
  paste: true,
  searchEnabled: false,
  searchChoices: true,
  searchResultLimit: -1,
  position: "auto",
  resetScrollPosition: true,
  shouldSort: true,
  shouldSortItems: false,
  placeholder: true,
  noChoicesText: "No available options",
  itemSelectText: "Click to select",
  classNames: {
    containerInner: "choices__inner tech-input-container",
    input: "choices__input",
  },
});
calculateSum(); //вызываем чтобы все отображалось при загрузке
const calculatorform = document.querySelector(".calculator-form"); //класс формы
calculatorform.addEventListener("submit", function (event) {
  event.preventDefault();
  calculateSum();
});
function calculateSum() {
  //selectors
  const vebsiteInput = document.querySelector("#calculator-form-website-type");
  const vedsiteCart = document.querySelector(
    "#calculator-form-input-cart input:checked"
  );
  const vebsiteReception = document.querySelector(
    "#calculator-form-input-reception input:checked"
  );

  //values

  const vedsiteTypeValue = extractPriceFromValue(vebsiteInput.value);
  const technologiesValue = getTechnologiesSum(
    technologiesMultiSelect.getValue()
  );
  const vedsiteCartValue = convertCartOptionToPrice(vedsiteCart.value);
  const vebsiteReceptionValue = convertReceptionOptionToPrice(
    vebsiteReception.value
  );
  const totalSum =
    vedsiteTypeValue +
    technologiesValue +
    vedsiteCartValue +
    vebsiteReceptionValue;
  renderSum(totalSum);
}
function renderSum(sum) {
  const costElement = document.querySelector(".calculator-form-total-cost");
  costElement.textContent = "Calculating...";

  setTimeout(function () {
    costElement.textContent = sum + "$";
  }, 2000);
}
function convertReceptionOptionToPrice(option) {
  if (option === "yes") {
    return 500;
  }
  return 0;
}
function convertCartOptionToPrice(option) {
  if (option === "yes") {
    return 300;
  }
  return 0;
}
function getTechnologiesSum(technologiesArr) {
  let totalsum = 0;
  technologiesArr.forEach(function (tech) {
    totalsum = totalsum + extractPriceFromValue(tech.value);
  });
  return totalsum;
}
function extractPriceFromValue(str) {
  const price = str.match(/:\d+/);

  if (price) {
    return Number(price[0].slice(1)) || 0;
  }

  return 0;
}
