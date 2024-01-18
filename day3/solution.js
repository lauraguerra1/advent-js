const fs = require('fs');

const filePath = './day3/data.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  const lines = data.split('\n');

  const checkSidesForSymbols = (line, currentIndex, hasSymbol) => {
    [-1, 0, 1].forEach((num) => {
      if (line && line[currentIndex + num] && isNaN(line[currentIndex + num]) && line[currentIndex + num] !== '.') {
        hasSymbol = true;
      }
    });
    return hasSymbol;
  };

  const checkPerimiterForSymbols = (lines, currentIndex, hasSymbol) => {
    lines.forEach((line) => {
      hasSymbol = checkSidesForSymbols(line, currentIndex, hasSymbol)
    });
    return hasSymbol;
  }

  const total = lines.reduce((acc, line, i) => {
    const prevParts = lines[i - 1]?.split('');
    const currentParts = line.split('');
    const nextParts = lines[i + 1]?.split('');

    const lineTotal = currentParts.reduce((total, part, index) => {
      let number = '';
      let currentIndex = index;
      let hasSymbol = false;

      if (isNaN(currentParts[index - 1])) {
        while (!isNaN(parseInt(currentParts[currentIndex]))) {
          number += currentParts[currentIndex];
          hasSymbol = checkPerimiterForSymbols([prevParts, nextParts, currentParts], currentIndex, hasSymbol)
          currentIndex++;
        }
      }

      if (hasSymbol) {
        total += parseInt(number);
      }

      return total;
    }, 0);

    acc += parseInt(lineTotal);
    return acc;
  }, 0);

  console.log(total);
});
