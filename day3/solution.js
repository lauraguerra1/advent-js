const fs = require('fs');

const filePath = './day3/data.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
      console.error('Error reading the file:', err);
      return;
  }

  const lines = data.split('\n');

  const total = lines.reduce((acc, line, i) => {    
    const prevParts = lines[i - 1]?.split('')
    const currentParts = line.split('')
    const nextParts = lines[i + 1]?.split('')
    
    const lineTotal = currentParts.reduce((total, part, index) => {
      let number = ''
      let focus = index
      let hasSymbol = false;

      if (isNaN(currentParts[index - 1])) {   
        while (!isNaN(parseInt(currentParts[focus]))) {
          number += currentParts[focus];
          [-1, 0, 1].forEach(num => {
            
            if (prevParts && prevParts[focus + num] && isNaN(prevParts[focus + num]) && prevParts[focus + num] !== '.') {
              hasSymbol = true
            } else if (nextParts && nextParts[focus + num] && isNaN(nextParts[focus + num]) && nextParts[focus + num] !== '.') {
              hasSymbol = true
            } else if (currentParts[focus + num] && isNaN(currentParts[focus + num]) && currentParts[focus + num] !== '.') {
              hasSymbol = true
            }
          })
          focus ++
        }
      }

      if (hasSymbol) {
        total += parseInt(number)
      }   
      
      return total
    }, 0)
    
    acc += parseInt(lineTotal);
    return acc;  
  }, 0);
  
  console.log( total);
});