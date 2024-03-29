

const fs = require('fs');

const filePath = './day1/data.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const lines = data.split('\n');
    const total = lines.reduce((acc,line) => {
      const firstDigit = line.split('').find(letter => !isNaN(parseInt(letter)));
      const lastDigit = line.split('').reverse().find(letter => !isNaN(parseInt(letter)));
      const num = parseInt(`${firstDigit}${lastDigit}`);
      acc += num;
      return acc;  
    }, 0);
  
  console.log(total);
});

