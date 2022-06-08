export const collaborationScore = (personas) => {
  let numberCurrentTotal = 0;
  let numberNeededTotal = 0;
  if (Array.isArray(personas)) {
    for (let persona of personas) {
      numberCurrentTotal += persona.numberCurrent ? persona.numberCurrent : 0;
      numberNeededTotal += persona.monthNeeded;
    }
    return (numberCurrentTotal / numberNeededTotal) * 100;
  }
};
