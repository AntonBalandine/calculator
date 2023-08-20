//HTMlקישורים ל

const numValuesInput1 = document.getElementById("num-values");
const valuesContainer1 = document.getElementById("values-container");
const numValuesInput2 = document.getElementById("num-values2");
const valuesContainer2 = document.getElementById("values-container2");
const tensionButton = document.getElementById("calculate-bolt-tension");
const chooseBoltCalc = document.getElementById("choose-bolt-calc");
const chooseBotResult = document.getElementById("result-choose-bolt");

chooseBoltCalc.onclick = calcTypeOfBolt;

//מעגל תוצאות ומראה עד שלוש ספרות אחרי הנקודה

function round(num) {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  });
}

//המתיכות בברגים בכח מתיכה

tensionButton.onclick = function () {
  const F = document.getElementById("ValueF").value;
  const n = document.getElementById("ValueN").value;

  const result = F / n;

  document.getElementById("result-bolt-tension").innerText =
    "Pi = " + round(result) + " [N]";

  document.querySelector("#bolt-tension .result-text").innerText =
    "(הכח על כל בורג)";
};

//המתיחות בברגים בכח גזירה

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

//פונקציית מרכז כובד

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
    "x(G) = " + round(resultX) + "<br/> y(G) = " + round(resultY);
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

//חלוקת הכח בגזירה בניצב לציר הבורג

const calcDivisionForce = () => {
  const [F, e, l1, l2] = [
    ...document.querySelectorAll(".divisionForce input"),
  ].map((input) => input.valueAsNumber);

  const c = (F * e) / (2 * l1 ** 2 + 2 * l2 ** 2);

  const F1 = c * l1;
  const F2 = c * l2;
  document.getElementById(
    "result-divisionForce"
  ).innerText = `F'1 = ${F1.toFixed(3)} [N]
F'2 = ${F2.toFixed(3)} [N]`;

  return [F1, F2];
};

document.getElementById("calculate-divisionForce").onclick = calcDivisionForce;

const calcCut = () => {
  const [F, n, fFriction] = [...document.querySelectorAll(".cut input")].map(
    (input) => input.valueAsNumber
  );
  const resultedF = F / n;
  document.getElementById("result-cut").innerText = `F'' = ${resultedF.toFixed(
    3
  )} [N]`;

  return [resultedF, fFriction];
};
document.getElementById("calculate-cut").onclick = calcCut;

document.getElementById("calculate-p").onclick = () => {
  const [F1, F2] = calcDivisionForce();
  const [fTag, fFriction] = calcCut();
  const p1 = fTag + F1 / fFriction;
  const p2 = fTag + F2 / fFriction;
  document.getElementById("result-p").innerText = `
  p1 = ${round(p1)}[N]
  p2 = ${round(p2)}[N]
  `;
};

//חלוקת הכח בגיזרה אקסנטרית

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

function calcA(D) {
  return (Math.PI * D ** 2) / 4;
}

const table = {
  //  PC    Sp
  4.6: 225,
  4.8: 310,
  5.8: 380,
  8.8: 600,
  9.8: 650,
  10.9: 830,
  12.9: 970,
};

const DcTable = {
  3.141: { Designation: "M 4", D: 4, pitch: 0.7 },
  4.019: { Designation: "M 5", D: 5, pitch: 0.8 },
  4.773: { Designation: "M 6", D: 6, pitch: 1 },
  6.466: { Designation: "M 8", D: 8, pitch: 1.25 },
  8.16: { Designation: "M 10", D: 10, pitch: 1.5 },
  9.853: { Designation: "M 12", D: 12, pitch: 1.75 },
  13.546: { Designation: "M 16", D: 16, pitch: 2 },
  16.933: { Designation: "M 20", D: 20, pitch: 2.5 },
  20.319: { Designation: "M 24", D: 24, pitch: 3 },
  25.706: { Designation: "M 30", D: 30, pitch: 3.5 },
  31.093: { Designation: "M 36", D: 36, pitch: 4 },
  36.479: { Designation: "M 42", D: 42, pitch: 4.5 },
  41.866: { Designation: "M 48", D: 48, pitch: 5 },
  49.252: { Designation: "M 56", D: 56, pitch: 5.5 },
  56.639: { Designation: "M 64", D: 64, pitch: 6 },
  64.639: { Designation: "M 72", D: 72, pitch: 6 },
  72.639: { Designation: "M 80", D: 80, pitch: 6 },
  82.639: { Designation: "M 90", D: 90, pitch: 6 },
  92.639: { Designation: "M 100", D: 100, pitch: 6 },
};

function calcTypeOfBolt() {
  const [P, FS, f] = [...document.querySelectorAll("#choose_bolt input")].map(
    (input) => Number(input.value)
  );
  const PC = document.querySelector("#choose_bolt select").value;
  const Sp = table[PC];
  const Ac = ((1.25 * P) / Sp) * FS;
  const Dc = Math.sqrt((4 * Ac) / Math.PI);
  const boltDiameter = Number(
    Object.keys(DcTable).find((currentDc) => Number(currentDc) > Dc)
  );
  const { Designation, D, pitch } = DcTable[boltDiameter];

  const Dm = (D + boltDiameter) / 2;
  const tanALFA = (pitch / Math.PI) * Dm;
  const secTETA = 1 / Math.cos(60);
  const Tt =
    ((P * Dm) / 2) * ((f * secTETA + tanALFA) / (1 - f * secTETA * tanALFA)); //מומנט הסגירת הדרוש הבורג

  console.log({ f, P, FS, PC, Sp, Designation, D, pitch, tanALFA, Tt });

  chooseBotResult.innerHTML = `
    <div>${Designation}</div>
    <div> D=${D} [mm]</div>
    <div>pitch=${pitch}</div>
    <br/>
    <div>Tt: ${Tt.toFixed(3)} [N*mm] (מומנט הסגירת הדרוש לבורג) </div> 
  `;
}
