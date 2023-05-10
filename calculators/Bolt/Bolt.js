var numValuesInput = document.getElementById("num-values");
var valuesContainer = document.getElementById("values-container");

const tensionButton = document.getElementById("calculate-bolt-tension");
tensionButton.onclick = function () {
  const F = document.getElementById("ValueF").value;
  const n = document.getElementById("ValueN").value;

  const result = F / n;

  document.getElementById("result-bolt-tension").innerText =
    "Pi = " + result.toFixed(3) + "[N]";
};

const cutButton = document.getElementById("calculate-bolt-cut");
cutButton.onclick = function () {
  const F = document.getElementById("ValueFCut").value;
  const n = document.getElementById("ValuenCut").value;
  const f = document.getElementById("ValuefCut").value;
  const k = document.getElementById("ValuekCut").value;
  const result = F / (n * f * k);

  document.getElementById("result-bolt-cut").innerText =
    "Pi = " + result.toFixed(3) + "[N]";
};

const gravityCenterButton = document.querySelector(`.MassSenter form`);
gravityCenterButton.onsubmit = function (e) {
  e.preventDefault();

  const xInputs = [];
  const yInputs = [];
  const aInputs = [];

  document
    .querySelectorAll(".xInput")
    .forEach((element) => xInputs.push(Number(element.value)));
  document
    .querySelectorAll(".yInput")
    .forEach((element) => yInputs.push(Number(element.value)));
  document
    .querySelectorAll(".aInput")
    .forEach((element) => aInputs.push(Number(element.value)));

  let moneX = 0;
  let moneY = 0;
  let mehane = 0;
  for (let index = 0; index < xInputs.length; index++) {
    const x = xInputs[index];
    const a = aInputs[index];
    const y = yInputs[index];
    moneX += x * a;
    moneY += y * a;
    mehane += a;
  }

  const resultX = moneX / mehane;
  const resultY = moneY / mehane;
  document.getElementById("result-MassSenter").innerHTML =
    "x^ = " + resultX.toFixed(3) + "<br/> y^ = " + resultY.toFixed(3);
};

numValuesInput.addEventListener("input", function () {
  var numValues = numValuesInput.value;

  // Remove any existing value inputs
  while (valuesContainer.firstChild) {
    valuesContainer.removeChild(valuesContainer.firstChild);
  }

  // Add new value inputs
  for (var i = 0; i < numValues; i++) {
    var xInput = document.createElement("input");
    xInput.type = "number";
    xInput.name = "x-value-" + i;
    xInput.placeholder = "X value #" + (i + 1);
    xInput.className = "xInput";

    var yInput = document.createElement("input");
    yInput.type = "number";
    yInput.name = "y-value-" + i;
    yInput.placeholder = "Y value #" + (i + 1);
    yInput.className = "yInput";

    var aInput = document.createElement("input");
    aInput.type = "number";
    aInput.name = "a-value-" + i;
    aInput.placeholder = "A value #" + (i + 1);
    aInput.className = "aInput";

    var valueContainer = document.createElement("div");
    valueContainer.appendChild(xInput);
    valueContainer.appendChild(yInput);
    valueContainer.appendChild(aInput);

    valuesContainer.appendChild(valueContainer);
  }
});

document.getElementById("calculate-divisionForce").onclick = () => {
  const [F, e, l1, l2] = [
    ...document.querySelectorAll(".divisionForce input"),
  ].map((input) => input.valueAsNumber);

  const c = (F * e) / (2 * l1 ** 2 + 2 * l2 ** 2);
  document.getElementById("result-divisionForce").innerText =
    "c = " + c.toFixed(3) + "[N/mm]";
};
