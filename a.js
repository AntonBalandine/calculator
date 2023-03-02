const arr = [1, 2, 3];

for (let index = 0; index < arr.length; index++) {
  const num = arr[index];
  console.log(num);
}

for (const num of arr) {
  console.log(num);
}

const obj = {
  name: "Yarden",
  age: 30,
};

console.log(Object.keys(obj)); // ['name', 'age']
console.log(Object.values(obj)); // ['Yarden', 30]
