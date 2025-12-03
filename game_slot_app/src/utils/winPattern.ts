export interface Win {
  clicksWin: number;
  winPerLoop: number;
  loopCount: number;
}

export interface ClickResult {
  win: boolean;
  nextClick: number;
  nextWin: number;
  nextStage: number;
  nextLoop: number;
}

export const winPattern: Win[] = [
  { clicksWin: 2, winPerLoop: 2, loopCount: 2 }, //zmaga bo ko bo  2 x 2
  { clicksWin: 3, winPerLoop: 3, loopCount: 3 }, // 3x interval po 3 x 3
  { clicksWin: 6, winPerLoop: 6, loopCount: 4 }, //4x interval po 6klik
];

export function getClicks(
  clicks: number,
  whichStage: number,
  winInxStage: number,
  whichLoop: number,
  winPattern: Win[]
): ClickResult {
  const currentStage = winPattern[whichStage];
  const countedClicks = clicks + 1;
  const isWinningClick = countedClicks % currentStage.clicksWin === 0;
  //ce ni zmaovalen klick pa stej to kot en klik in returnaj false celotni funkciji
  if (!isWinningClick) {
    return {
      win: false,
      nextClick: countedClicks,
      nextWin: winInxStage,
      nextStage: whichStage,
      nextLoop: whichLoop,
    };
  }

  // WIN
  let nextWin = winInxStage + 1;
  let nextStage = whichStage;
  let nextClick = countedClicks;
  let nextLoop = whichLoop;

  //ce si zmagal vec kot je zmagnih klikov v fazi pejdi v naslednjo
  if (nextWin >= currentStage.winPerLoop) {
    nextLoop += 1;
    nextWin = 0;

    if (nextLoop >= currentStage.loopCount) {
      nextStage = (whichStage + 1) % winPattern.length;
      nextClick = 0;
      nextLoop = 0;
    }
  }

  return {
    win: true,
    nextClick,
    nextWin,
    nextStage,
    nextLoop,
  };
}
