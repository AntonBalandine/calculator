const dynamicConstraint = document.getElementById("dynamic-constraint");
//document.getElementById("calculatespring").onclick = Springcalculator;
//document.getElementById("calculatespringw").onclick = springwahl;
document.getElementById("calculatespringtau").onclick = resultspringtau;
document.getElementById("stressformula").onclick = () => {
  if (dynamicConstraint.checked) {
    dynamicStressFormula();
  } else {
    staticStressFormula();
  }
};

document
  .getElementById("static-constraint")
  .addEventListener("change", radioChange);

dynamicConstraint.addEventListener("change", radioChange);

function radioChange(e) {
  const container = document.getElementById("FminContainer");
  container.style.display = dynamicConstraint.checked ? "block" : "none";
  const smallDcontainer = document.getElementById("dContainer");
  smallDcontainer.style.display = dynamicConstraint.checked ? "block" : "none";
  const nContainer = document.getElementById("nContainer");
  nContainer.style.display = dynamicConstraint.checked ? "block" : "none";
}

const table = {
  1.0: { FDC: 1800, TDC: 1700 },
  1.3: { FDC: 1750, TDC: 1700 },
  1.6: { FDC: 1720, TDC: 1650 },
  2.0: { FDC: 1670, TDC: 1600 },
  2.5: { FDC: 1600, TDC: 1600 },
  3.0: { FDC: 1550, TDC: 1570 },
  4.0: { FDC: 1540, TDC: 1500 },
  4.5: { FDC: 1510, TDC: 1500 },
  5.0: { FDC: 1470, TDC: 1490 },
  6.0: { FDC: 1440, TDC: 1470 },
  7.0: { FDC: 1400, TDC: 1420 },
  8.0: { FDC: 1380, TDC: 1370 },
  10.0: { FDC: 1320, TDC: 1340 },
};

function Springcalculator() {
  const D = Number(document.getElementById("ValueD").value);
  const C = Number(document.getElementById("ValueCa").value);

  if (isNaN(D) || isNaN(C)) {
    alert("D and C must be numbers");
    return;
  }

  if (C <= 0) {
    alert("C cannot be <= 0");
    return;
  }
  const resultspring = D / C;

  document.getElementById("resultspring").innerText = "Result: " + resultspring;
}

function springwahl() {
  const C = document.getElementById("ValueCb").value;

  if (C <= 0) {
    alert("C cannot be <= 0");
    return;
  }
  if (isNaN(C)) {
    alert("C must be number");
    return;
  }
  const K = calcKbyC(C);
  document.getElementById("valueK").value = K;

  document.getElementById("resultspringw").innerText = "Result: " + K;
  staticStressFormula();
}

function resultspringtau() {
  const K = document.getElementById("ValueK").valueAsNumber;
  const F = document.getElementById("valueFtau").valueAsNumber;
  const d = document.getElementById("Valued").valueAsNumber;
  const D = document.getElementById("ValueD").valueAsNumber;
  // if (C <= 0) {
  //   alert("C cannot be <= 0");
  //   return;
  // }
  // if (isNaN(C)) {
  //   alert("C must be number");
  //   return;
  // }
  const resultwahl = K * ((8 * F * D) / (Math.PI * d ** 3));

  document.getElementById("resultspringtau").innerHTML =
    "&tau; = " + resultwahl.toFixed(3) + " [N/mm&#178;]";
}

function staticStressFormula() {
  const F = document.getElementById("ValueF").value;
  const C = document.getElementById("ValueC").value;
  const FS = Number(document.getElementById("ValueFS").value);
  const K = calcKbyC(C);

  // input validation

  if (F <= 0) {
    alert("F cannot be <= 0 ");
    return;
  }
  if (isNaN(F) || isNaN(FS)) {
    alert("F and FS must be a number");
    return;
  }

  if (FS < 1 || FS > 1.5) {
    alert("FS not in correct range: 1 < FS < 1.5 ");
    return;
  }
  //

  const ValueMaxCut = document.getElementById("ValueMaxCut").value / 100;

  let T;
  let d;
  let Sut;
  let Tall;
  let ratio;
  let found = false;

  const sortedTable = Object.entries(table).sort((a, b) => a[0] - b[0]);
  for (const [key, value] of sortedTable) {
    //   1: { FDC: 1800, TDC: 1700 },
    //   1.3: { FDC: 1750, TDC: 1700 },
    //   1.6: { FDC: 1720, TDC: 1650 },

    Sut = value.TDC;
    Tall = Sut * ValueMaxCut;
    d = Number(key);
    T = K * ((8 * F * C) / (Math.PI * d ** 2));
    ratio = Tall / T;
    if (ratio >= FS && ratio > 1 && ratio < 1.5) {
      found = true;
      break;
    }
  }

  if (!found) {
    alert("Cannot find small d");
    return;
  }
  document.getElementById("resultspring").textContent = found
    ? "d=" + d
    : "Cannot find d";
  console.log("stressformula", { T, d, Sut, Tall, ratio });
}

function dynamicStressFormula() {
  const Fmax = Number(document.getElementById("ValueF").value);
  const Fmin = Number(document.getElementById("ValueFmin").value);
  const C = document.getElementById("ValueC").value;
  //const FS = Number(document.getElementById("ValueFS").value);
  let d = Number(document.getElementById("smallDiDynamic").value);
  const lamda = document.getElementById("delta").value;
  const G = document.getElementById("G").value;
  const hasOptionalParams = lamda && G;

  const K = calcKbyC(C);
  const Ks = calcKsbyC(C);
  const Favg = (Fmax + Fmin) / 2;
  const Famp = (Fmax - Fmin) / 2;

  const sortedTable = Object.entries(table).sort((a, b) => a[0] - b[0]);
  const dIndex = sortedTable.findIndex((row) => row[0] == d);
  const tableFromIndex = sortedTable.splice(dIndex, sortedTable.length);

  let found = false;
  let FS;
  let D;
  for (const [key, value] of tableFromIndex) {
    d = Number(key);
    D = C * d;
    const TDC = value.TDC;
    const Tavg = Ks * ((8 * Favg * D) / (Math.PI * d ** 3));
    const Tamp = K * ((8 * Famp * D) / (Math.PI * d ** 3));
    const Sse = 0.22 * TDC;
    const Ssy = 0.45 * TDC;

    FS = (Sse * Ssy) / (4 * Tamp * Ssy - 2 * Tamp * Sse - Sse * Tavg);

    //
    if (
      (hasOptionalParams && FS >= 1) ||
      (!hasOptionalParams && FS >= 1 && FS <= 1.5)
    ) {
      found = true;
      break;
    }
  }
  if (!found) {
    alert("Cannot find small d");
    return;
  }

  let N;
  let Nt;
  let Lf;

  // only if data was inserted in G & delta inputs
  if (lamda && G) {
    N = Math.ceil((lamda * G * d ** 4) / (8 * (Fmax - Fmin) * D ** 3));
    Nt = N + 2;

    const fittedDelta = (8 * Fmax * D ** 3 * N) / (G * d ** 4);
    const GT = (Nt - 1) * 0.5;
    const Ls = Nt * d;
    Lf = fittedDelta + GT + Ls;
  }

  document.getElementById("resultspring").innerHTML = found
    ? `d=${d} [mm]<br/>
    ${N ? `N=${N}<br/>Nt=${Nt}<br/> Lf=${Lf.toFixed(2)} [mm]` : ""}`
    : "Cannot find d";
  console.log("dynamic", { d, FS, Ks, K, Famp, Favg });
}

function calcKbyC(C) {
  return (4 * C - 1) / (4 * C - 4) + 0.615 / C;
}

function calcKsbyC(C) {
  return 1 + 0.5 / C;
}
