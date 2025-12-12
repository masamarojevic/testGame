"use client";
import React, { useState, useEffect } from "react";
import { useModal } from "@/app/components/modalProvider";
import { ModalOptions } from "@/app/enums/optionEnums";
import { DottedGlowBackground } from "@/app/components/background";
import { generate3x3Grid } from "@/utils/createGrid";
import { getSpinningTheSlot } from "@/utils/spinLogic";
import { getClicks } from "@/utils/winPattern";
import { winPattern } from "@/utils/winPattern";

export default function SlotPage() {
  const BRAIN: string = "/slotIcons/brain.png";
  const EYE: string = "/slotIcons/eye.png";
  const DNA: string = "/slotIcons/dna.png";
  const NOSE: string = "/slotIcons/nose.png";
  const TONGUE: string = "/slotIcons/tongue.png";
  const icons: string[] = [BRAIN, EYE, DNA, NOSE, TONGUE];
  const colorsBtns: string[] = [
    "bg-red-500 hover:bg-red-400",
    "bg-green-500 hover:bg-green-400",
    "bg-blue-500 hover:bg-blue-400",
    "bg-yellow-500 hover:bg-yellow-400",
  ];

  const [isSpinning, setIsSpinning] = useState(false);
  const [showBetMoney, setShowBetMoney] = useState(false);
  const [defaultBetMoney, setDefaultBetMoney] = useState(0);
  const [iconSet, setIconSet] = useState<string[][]>([]);
  const [money, setMoney] = useState(500);
  let betOptions: number[] = [20, 50, 100, 200];
  const [betMoney, setBetMoney] = useState<number | null>(null);
  const { openModal } = useModal();
  const [tempGrid, setTempGrid] = useState<string[][] | null>(null);
  let [clicks, setClicks] = useState(0);
  //za stet zmage v enem obj
  const [winInxStage, setWinInxStage] = useState(0);
  //v katerem obj se nahajas[0,1,2]
  const [whichStage, setWhichStage] = useState(0);
  const [whichLoop, setWhichLoop] = useState(0);

  function countClicks(): boolean {
    const result = getClicks(
      clicks,
      whichStage,
      winInxStage,
      whichLoop,
      winPattern
    );
    setClicks(result.nextClick);
    setWinInxStage(result.nextWin);
    setWhichStage(result.nextStage);
    setWhichLoop(result.nextLoop);
    return result.win;
  }

  useEffect(() => {
    setIconSet(generate3x3Grid(icons));
  }, []);

  //KLIK BET GUMBI
  function chooseBetMoney(e: React.MouseEvent<HTMLButtonElement>) {
    const value = Number(e.currentTarget.value);
    setShowBetMoney(true);
    setDefaultBetMoney(value);
    setBetMoney(value);
  }

  //KLIK NA SPIN
  function spinningTheSlot() {
    //null da lahko dobimo animacijo
    setTempGrid(null);
    if (betMoney === null) {
      openModal(ModalOptions.noBetMoney);
      return;
    }

    if (money === 0 || money < betMoney) {
      openModal(ModalOptions.outOfMoney);
      setIsSpinning(false);
      return;
    }
    setIsSpinning(true);
    let m = money - betMoney;
    setMoney(m);

    const spinInterval = setInterval(() => {
      setIconSet(generate3x3Grid(icons));
    }, 80);

    //  koncaj spin
    setTimeout(() => {
      clearInterval(spinInterval);
      //vedno prvo stej klike
      const patternWin = countClicks();
      //kopija grida
      const finalGrid = iconSet.map((row) => [...row]);

      const { iconWin, money, tempGrid } = getSpinningTheSlot(
        finalGrid,
        betMoney,
        patternWin
      );

      setTempGrid(tempGrid); // zacasen win
      setMoney((prev) => prev + money);
      openModal(iconWin || patternWin ? ModalOptions.Win : ModalOptions.Lose);
      setIsSpinning(false);
    }, 1000);
  }
  return (
    <div className="min-h-screen flex justify-center items-center flex-col overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <DottedGlowBackground />
      </div>
      <div className="flex flex-col lg:flex-row w-full lg:gap-5 items-start lg:items-stretch lg:pr-2 lg:pl-2">
        <div className="w-full lg:w-1/2 md:p-6 flex justify-center box-border items-center p-2 order-1 lg:order-1 lg:border--4 lg:border-[#444b97] rounded">
          <div className="grid grid-cols-3 grid-rows-3 gap-2">
            {(tempGrid ?? iconSet).flat().map((icon, idx) => (
              <img
                key={idx}
                src={icon}
                className="bg-white rounded w-28 h-28 md:w-36 md:h-36 lg:w-64 lg:h-64"
                alt="slot icon"
              />
            ))}
          </div>
        </div>
        <aside className="w-full box-border lg:w-1/2 flex flex-col justify-center items-center rounded border-0 lg:border-4 lg:border-[#444b97] lg:gap-10 py-2 gap-4 order-2 lg:order-2">
          <h1 className="font-quantico text-2xl sm:text-3xl font-bold mt-2">
            Place Your Bet
          </h1>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {betOptions.map((value, idx) => (
              <button
                key={value}
                value={value}
                onClick={chooseBetMoney}
                className={`${colorsBtns[idx]} font-quantico font-normal text-white w-16 h-10 sm:w-20 sm:h-12 rounded`}
              >
                {value}
              </button>
            ))}
          </div>
          <div className="font-quantico font-normal flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-5 mt-2">
            <p>Your bet: {defaultBetMoney}</p>
            <p> Your money: {money}</p>
          </div>
          <button
            onClick={spinningTheSlot}
            className="font-quantico bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition-colors w-32 py-3 lg:static lg:mt-4 lg:mb-10 lg:translate-x-0 mb-10 mt-4"
          >
            SPIN
          </button>
        </aside>
      </div>
      <div className="mt-5">
        Icons by{" "}
        <a href="https://www.freepik.com" target="_blank">
          Freepik
        </a>
        from{" "}
        <a href="https://www.flaticon.com/" target="_blank">
          Flaticon
        </a>
      </div>
    </div>
  );
}
