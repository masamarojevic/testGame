export function getSpinningTheSlot(
  finalGrid: string[][],
  betMoney: number,
  patternWin: boolean
) {
  const firstRow = finalGrid[0];
  const middleRow = finalGrid[1];
  const lastRow = finalGrid[2];

  const firstRowWin =
    firstRow[0] === firstRow[1] && firstRow[1] === firstRow[2];
  const middleRowWin =
    middleRow[0] === middleRow[1] && middleRow[1] === middleRow[2];
  const lastRowWin = lastRow[0] === lastRow[1] && lastRow[1] === lastRow[2];

  const iconWin = firstRowWin || middleRowWin || lastRowWin;

  let money = 0;
  let tempGrid = null;

  if (!iconWin && patternWin) {
    const winIcon = finalGrid[1][1];
    tempGrid = finalGrid.map((row, i) =>
      i === 1 ? [winIcon, winIcon, winIcon] : [...row]
    );
    money = betMoney * 2;
  } else if (iconWin) {
    money = betMoney * 2;
  }
  return { iconWin, money, tempGrid };
}
