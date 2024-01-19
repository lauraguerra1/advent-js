const fs = require('fs');

const filePath = './day4/data.txt';

const getCardInfo = (line) => {
  return {
    cardNum: line.split('|')[0].split(':')[0].slice(4),
    winningNums: line.split('|')[0].split(':')[1].split(' ').filter(item => item !== ''),
    cardNums: line.split('|')[1].split(' ').filter(item => item !== '')
  }
}

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  
  const splitLines = data.split('\n');
  let allCardsWon = 0;
  let currentRunThrough = [];
  
  const getCurrentRunThrough = (lines) => { 
    const total = lines.reduce((totalCards, currentLine) => {
      const { cardNum, winningNums, cardNums } = getCardInfo(currentLine)

      const cardsWonFromLine = cardNums.reduce((cardsWon, currentNum) => {
        if (winningNums.includes(currentNum)) {
          cardsWon += 1
        }

        return cardsWon;
      }, 0)
    
      for (i = 0; i < cardsWonFromLine; i++) {
        totalCards.push(splitLines[parseInt(cardNum) + i])
      }
      return totalCards;
    }, [])

    allCardsWon += total.length;
    currentRunThrough = total;
    while (currentRunThrough.length) {
      getCurrentRunThrough(currentRunThrough)
    }
  }
  getCurrentRunThrough(splitLines)
  console.log(allCardsWon + splitLines.length)
});