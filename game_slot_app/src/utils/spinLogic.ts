export function getSpinningTheSlot(
  finalGrid: string[][],
  betMoney: number,
  patternWin: boolean
) {
  const firstRow = finalGrid[0];
  const middleRow = finalGrid[1];
  const lastRow = finalGrid[2];

  const firstCol = finalGrid[0][0];
  const secondCol = finalGrid[0][1];
  const thirdCol = finalGrid[0][2];
  //horizontal
  const firstRowWin =
    firstRow[0] === firstRow[1] && firstRow[1] === firstRow[2];

  const middleRowWin =
    middleRow[0] === middleRow[1] && middleRow[1] === middleRow[2];

  const lastRowWin = lastRow[0] === lastRow[1] && lastRow[1] === lastRow[2];

  //vertical
  const firstColWin =
    firstCol === finalGrid[1][0] && finalGrid[1][0] === finalGrid[2][0];

  const middleColWin =
    secondCol === finalGrid[1][1] && finalGrid[1][1] === finalGrid[2][1];

  const lastColWin =
    thirdCol === finalGrid[1][2] && finalGrid[1][2] === finalGrid[2][2];

  const iconWin = firstRowWin || middleRowWin || lastRowWin;
  const verticalIconWin = firstColWin || middleColWin || lastColWin;

  let money = 0;
  let tempGrid = null;

  if (!iconWin && !verticalIconWin && patternWin) {
    const winIcon = finalGrid[1][1];
    tempGrid = finalGrid.map((row, i) =>
      i === 1 ? [winIcon, winIcon, winIcon] : [...row]
    );
    money = betMoney * 2;
  } else if (iconWin && verticalIconWin) {
    money = betMoney * 4;
  } else if (iconWin) {
    money = betMoney * 2;
  }
  return { iconWin, verticalIconWin, money, tempGrid };
}
