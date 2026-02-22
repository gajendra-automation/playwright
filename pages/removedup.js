let input = "aabbcc";
let count = {};
let output = "";

// Count characters
for (let i = 0; i < input.length; i++) {
  let ch = input[i];
  if (count[ch]) {
    count[ch]++;
  } else {
    count[ch] = 1;
  }
}

// Build output string without map()
for (let key in count) {
  output += key + "=" + count[key] + ",";
}

// Remove last comma
output = output.slice(0, -1);

console.log(output);