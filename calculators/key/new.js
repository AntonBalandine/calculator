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
  const T = document.getElementById(`valueT-cut`).valueAsNumber;
  const d = document.getElementById("valued-cut").valueAsNumber;
  const L = document.getElementById("valueL-cut").valueAsNumber;
  const Sy = document.getElementById("valueSy").valueAsNumber;
  const FS = document.getElementById("valueFS-cut").valueAsNumber;
  const result = (4 * T * FS) / (d * 0.001 * Sy * L);

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
  2: { b: 2, h: 2 },
  3: { b: 3, h: 3 },
  4: { b: 4, h: 4 },
  5: { b: 5, h: 5 },
  6: { b: 6, h: 6 },
  7: { b: 8, h: 7 },
  8: { b: 10, h: 8 },
  8.5: { b: 12, h: 8 },
  9: { b: 14, h: 9 },
  9.5: { b: 16, h: 10 },
  10: { b: 18, h: 11 },
  11: { b: 20, h: 12 },
  12: { b: 22, h: 14 },
  13: { b: 25, h: 14 },
  15: { b: 28, h: 16 },
  17: { b: 32, h: 18 },
  19: { b: 36, h: 20 },
  21: { b: 40, h: 22 },
  22: { b: 45, h: 25 },
  26: { b: 50, h: 28 },
};

function KeySquashCalculator() {
  const T = document.getElementById("valueT").valueAsNumber;
  const d = document.getElementById("valued-s").valueAsNumber;
  const L = document.getElementById("valueL").valueAsNumber;
  const Sc = document.getElementById("valueSc").valueAsNumber;
  const FS = document.getElementById("valueFS").valueAsNumber;
  const result = (2 * T * FS) / (d * 0.001 * Sc * L);

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
