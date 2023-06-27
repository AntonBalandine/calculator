const numValuesInput1 = document.getElementById("num-values");
const valuesContainer1 = document.getElementById("values-container");
const numValuesInput2 = document.getElementById("num-values2");
const valuesContainer2 = document.getElementById("values-container2");
const tensionButton = document.getElementById("calculate-bolt-tension");

function round(num) {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  });
}

tensionButton.onclick = function () {
  const F = document.getElementById("ValueF").value;
  const n = document.getElementById("ValueN").value;

  const result = F / n;

  document.getElementById("result-bolt-tension").innerText =
    "Pi = " + round(result) + "[N]";

  document.querySelector("#bolt-tension .result-text").innerText =
    "הכח על כל בורג";
};

const cutButton = document.getElementById("calculate-bolt-cut");
cutButton.onclick = function () {
  const F = document.getElementById("ValueFCut").value;
  const n = document.getElementById("ValuenCut").value;
  const f = document.getElementById("ValuefCut").value;
  const k = document.getElementById("ValuekCut").value;
  const result = F / (n * f * k);

  document.getElementById("result-bolt-cut").innerText =
    "Pi = " + round(result) + "[N]";
};

const gravityCenterButton = document.querySelector(`.MassSenter form`);
gravityCenterButton.onsubmit = function (e) {
  e.preventDefault();

  const xInputs = [];
  const yInputs = [];
  const D = document.querySelector(
    ".MassSenter form #MassCenterA"
  ).valueAsNumber;
  const a = calcA(D);

  document
    .querySelectorAll(".xInput")
    .forEach((element) => xInputs.push(Number(element.value)));
  document
    .querySelectorAll(".yInput")
    .forEach((element) => yInputs.push(Number(element.value)));

  const { resultX, resultY } = calcMassCenter(xInputs, yInputs, a);

  document.getElementById("result-MassSenter").innerHTML =
    "x(G) = " + resultX.toFixed(3) + "<br/> y(G) = " + resultY.toFixed(3);
};

numValuesInput1.addEventListener("input", function () {
  addInputs(numValuesInput1, valuesContainer1);
});
numValuesInput2.addEventListener("input", function () {
  addInputs(numValuesInput2, valuesContainer2);
});

function calcMassCenter(xInputs, yInputs, a) {
  let sumXa = 0;
  let sumYa = 0;
  let mehane = 0;
  for (let index = 0; index < xInputs.length; index++) {
    const x = xInputs[index];
    const y = yInputs[index];
    sumXa += x * a;
    sumYa += y * a;
    mehane += a;
  }
  const resultX = sumXa / mehane;
  const resultY = sumYa / mehane;
  return { resultX, resultY };
}

function addInputs(numInput, container) {
  const numValues = numInput.value;

  // Remove any existing value inputs
  while (container.firstChild) {
    container.removeChild(container.firstChild);
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

    // var aInput = document.createElement("input");
    // aInput.type = "number";
    // aInput.name = "a-value-" + i;
    // aInput.placeholder = "A value (שטח חתך הבורג)" + (i + 1);
    // aInput.className = "aInput";

    var valueContainer = document.createElement("div");
    valueContainer.appendChild(xInput);
    valueContainer.appendChild(yInput);
    // valueContainer.appendChild(aInput);

    container.appendChild(valueContainer);
  }
}

const calcDivisionForce = () => {
  const [F, e, l1, l2] = [
    ...document.querySelectorAll(".divisionForce input"),
  ].map((input) => input.valueAsNumber);

  const c = (F * e) / (2 * l1 ** 2 + 2 * l2 ** 2);

  const F1 = c * l1;
  const F2 = c * l2;
  document.getElementById(
    "result-divisionForce"
  ).innerText = `F''1 = ${F1.toFixed(3)} [N]
F''2 = ${F2.toFixed(3)} [N]`;

  return [F1, F2];
};

document.getElementById("calculate-divisionForce").onclick = calcDivisionForce;

const calcCut = () => {
  const [F, n, f] = [...document.querySelectorAll(".cut input")].map(
    (input) => input.valueAsNumber
  );
  const resultedF = F / n;
  document.getElementById("result-cut").innerText = `F' = ${resultedF.toFixed(
    3
  )} [N]`;

  return [resultedF, f];
};
document.getElementById("calculate-cut").onclick = calcCut;

document.getElementById("calculate-p").onclick = () => {
  const [F1, F2] = calcDivisionForce();
  const [resultedF, f] = calcCut();

  const p = resultedF + (F1 + F2) / f;

  document.getElementById("result-p").innerText = `p = ${p.toFixed(3)}[N]`;
};

document.getElementById("calculate-cd").onclick = () => {
  const [F, XF, YF, D, numberOfBolts] = [
    ...document.querySelectorAll(".ParalelForce input"),
  ].map((input) => input.valueAsNumber);

  const xInputs = [];
  const yInputs = [];

  document
    .querySelectorAll(".xInput")
    .forEach((element) => xInputs.push(Number(element.value)));
  document
    .querySelectorAll(".yInput")
    .forEach((element) => yInputs.push(Number(element.value)));

  const a = calcA(D);
  const { resultX: resultX0, resultY: resultY0 } = calcMassCenter(
    xInputs,
    yInputs,
    a
  );

  const e = Math.sqrt((XF - resultX0) ** 2 + (YF - resultY0) ** 2);
  const M = e * F;

  const riResult = [];
  let rSumSquare = 0;
  for (let index = 0; index < xInputs.length; index++) {
    const x = xInputs[index];
    const y = yInputs[index];
    const ri = Math.sqrt((x - resultX0) ** 2 + (y - resultY0) ** 2);
    riResult.push(ri);
    rSumSquare += ri ** 2;
  }

  const c = (F * e) / rSumSquare;

  const FittResult = [];
  const FixResult = [];
  const FiyResult = [];
  const FiResult = [];
  for (let index = 0; index < riResult.length; index++) {
    const ri = riResult[index];
    const Fitt = c * ri;
    FittResult.push(Fitt);

    const xi = xInputs[index];
    const COSi = (xi - resultX0) / ri;
    const yi = yInputs[index];
    const SINi = (yi - resultY0) / ri;

    const Fix = -Fitt * SINi;
    FixResult.push(Fix);
    const Fiy = -Fitt * COSi;
    FiyResult.push(Fiy);

    const Fit = F / numberOfBolts;
    const Fi = Math.sqrt(Fix ** 2 + (Fiy + Fit) ** 2);
    FiResult.push(Fi);
  }

  console.log({ rResult: riResult, xInputs, yInputs, e, M, c });

  document.getElementById("result-cd").innerHTML =
    `M: ${M.toFixed(3)} [Nm]
  <br/>
  ` +
    "x(G) = " +
    resultX0.toFixed(3) +
    "<br/> y(G) = " +
    resultY0.toFixed(3) +
    `
  ${riResult
    .map(
      (r, i) =>
        `<div style="padding-left: 5px;">  r${i + 1} = ${r.toFixed(
          3
        )} [mm]</div>`
    )
    .join("")}
    <br/>
    ${FiResult.map(
      (Fi, i) =>
        `<div style="padding-left: 5px;">  F${i + 1} = ${Fi.toFixed(
          3
        )} [N]</div>`
    ).join("")}
    `;
};

// Fi = Math.sqrt(Fix ** 2 + (Fiy + Fit) ** 2);

// Fit = F/

//const cos.i = (xi - x0) / ri;

//const sin.i = (yi - y0) / ri;

// const Fix = -Fitt * sin.i;

// const Fiy = -Fitt * cos.i;

// FTotal = Math.sqrt(Fix ** 2 + (Fiy + resultedF) ** 2);

// var r = r;

// const e = Math.sqrt((XF ** 2) + (YF ** 2));

// const M = e * F;

function calcA(D) {
  return (Math.PI * D ** 2) / 4;
}
