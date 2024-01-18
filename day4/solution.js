const fs = require('fs');

const filePath = './day4/data.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  
  const lines = data.split('\n');
  const total = lines.reduce((totalPoints, currentLine) => {
    const winningNums = currentLine.split('|')[0].split(':')[1].split(' ').filter(item => item !== '');
    const cardNums = currentLine.split('|')[1].split(' ').filter(item => item !== '');

    const linePoints = cardNums.reduce((total, currentNum) => {
      if (!total && winningNums.includes(currentNum)) {
        total += 1;
      } else if (winningNums.includes(currentNum)) {
        total *= 2;
      }
      
      return total;
    }, 0)

    totalPoints += linePoints;
    return totalPoints;
  }, 0)

  console.log(total)
});

