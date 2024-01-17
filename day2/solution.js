const fs = require('fs');

const filePath = './day2/data.txt';

const rules = {
  red: 12, 
  green: 13, 
  blue: 14
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const lines = data.split('\n');
    const total = lines.reduce((acc,line) => {
      const game = line.split(/[;,:]\s/);
      let id = parseInt(game[0].slice(4));
      let invalid = false;

      game.forEach((turn, i) => {
        if (i) {
          const [amount, color] = turn.split(' ')
          if (rules[color] < amount) invalid = true;
        }
      })

      if (!invalid) acc += id; 
      
      return acc;  
    }, 0);
  
  console.log(total);
});

