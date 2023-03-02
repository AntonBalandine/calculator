const cutResultButton = document.getElementById("calculate-key-cut"); // catch result button
cutResultButton.addEventListener("click", KeyCutCalculator); // listen to 'click' on the result button
const squashResultButton = document.getElementById("calculate-key-squash");
// squashResultButton.style.color = "red";
squashResultButton.addEventListener("click", KeySquashCalculator);

// //const f_name = "anton";
// const f_name = "10";
// console.log(typeof f_name); // 'string'
// console.log(`my name is ${f_name}`);

function KeyCutCalculator() {
  const T = document.getElementById(`valueT-cut`).value;
  const L = document.getElementById("valueL-cut").value;
  const Sy = document.getElementById("valueSy").value;
  const FS = document.getElementById("valueFS-cut").value;
  const result = (4 * T * FS) / (Sy * L);

  let range = 0;
  for (const key of Object.keys(table)) {
    // 6          4
    if (result <= key) {
      range = key;
      break;
    }
  }
  // range = 9
  document.getElementById("result-cut").innerText = `result: ${result.toFixed(
    3
  )}
  b: ${table[range].b} ${"mm"}
  h: ${table[range].h} ${"mm"}`;
}

const table = {
  4: { b: 2, h: 2 },
  9: { b: 3, h: 3 },
  16: { b: 4, h: 4 },
  25: { b: 5, h: 5 },
  36: { b: 6, h: 6 },
  56: { b: 8, h: 7 },
  80: { b: 10, h: 8 },
  96: { b: 12, h: 8 },
  126: { b: 14, h: 9 },
  160: { b: 16, h: 10 },
  198: { b: 18, h: 11 },
  240: { b: 20, h: 12 },
  308: { b: 22, h: 14 },
  350: { b: 25, h: 14 },
  448: { b: 28, h: 16 },
  576: { b: 32, h: 18 },
  720: { b: 36, h: 20 },
  880: { b: 40, h: 22 },
  1125: { b: 45, h: 25 },
  1400: { b: 50, h: 28 },
};

function KeySquashCalculator() {
  const T = document.getElementById("valueT").value;
  const L = document.getElementById("valueL").value;
  const Sc = document.getElementById("valueSc").value;
  const FS = document.getElementById("valueFS").value;
  const result = (2 * T * FS) / (Sc * L);

  let range = 0;
  for (const key of Object.keys(table)) {
    // 6          4
    if (result <= key) {
      range = key;
      break;
    }
  }
  // range = 9
  document.getElementById("result-squash").innerText = `result: ${result}
  b: ${table[range].b} ${"mm"}
  h: ${table[range].h} ${"mm"}`;
}
