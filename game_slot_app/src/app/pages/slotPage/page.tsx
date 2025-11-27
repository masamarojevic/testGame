"use client";
import React, { useState, useEffect } from "react";
import { useModal } from "@/app/components/modalProvider";
import { ModalOptions } from "@/app/enums/optionEnums";
import { DottedGlowBackground } from "@/app/components/background";

export default function slotPage() {
  const BRAIN: string = "/slotIcons/brain.png";
  const EYE: string = "/slotIcons/eye.png";
  const DNA: string = "/sloticons/dna.png";
  const NOSE: string = "/slotIcons/nose.png";
  const TONGUE: string = "/slotIcons/tongue.png";
  const icons: string[] = [BRAIN, EYE, DNA, NOSE, TONGUE];
  const colorsBtns: string[] = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
  ];

  const [isSpinning, setIsSpinning] = useState(false);
  const [showBetMoney, setShowBetMoney] = useState(false);
  const [defaultBetMoney, setDefaultBetMoney] = useState(0);
  const [iconSet, setIconSet] = useState<string[][]>([]);
  const [money, setMoney] = useState(500);
  let betOptions: number[] = [20, 50, 100, 200];
  const [betMoney, setBetMoney] = useState<number | null>(null);
  const { openModal } = useModal();

  function generete3x3Grid() {
    const rows: number = 3;
    const cols: number = 3;
    const grid: string[][] = [];

    //za vsak i v rows naredi array in za vsak j v cols daj sliko
    for (let i = 0; i < rows; i++) {
      let row: string[] = [];
      for (let j = 0; j < cols; j++) {
        const rndIcon = icons[Math.floor(Math.random() * icons.length)];
        row.push(rndIcon);
      }
      grid.push(row);
    }
    return grid;
  }

  useEffect(() => {
    setIconSet(generete3x3Grid());
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
      setIconSet(generete3x3Grid());
    }, 80);

    //  koncaj spin
    setTimeout(() => {
      clearInterval(spinInterval);

      // koncni rezultat
      const finalGrid = iconSet;
      setIconSet(finalGrid);

      const firstRow = finalGrid[0];
      const middleRow = finalGrid[1];
      const lastRow = finalGrid[2];

      const firstRowWin =
        firstRow[0] === firstRow[1] && firstRow[1] === firstRow[2];
      const middleRowWin =
        middleRow[0] === middleRow[1] && middleRow[1] === middleRow[2];
      const lastRowWin = lastRow[0] === lastRow[1] && lastRow[1] === lastRow[2];

      // update money
      if (middleRowWin || firstRowWin || lastRowWin) {
        m += betMoney * 2;
        openModal(ModalOptions.Win);
      } else {
        openModal(ModalOptions.Lose);
      }

      setMoney(m);
      setIsSpinning(false);
    }, 1000);
  }
  return (
    <div className="min-h-screen flex justify-center items-center flex-col overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <DottedGlowBackground />
      </div>
      <div className="flex flex-col lg:flex-row w-full lg:gap-5 items-start lg:items-stretch lg:pr-2 lg:pl-2">
        <div className="w-full lg:w-1/2 md:p-6 flex justify-center box-border items-center p-2 order-last lg:order-1 lg:border-4 lg:border-[#444b97] rounded">
          <div className="grid grid-cols-3 grid-rows-3 gap-2 sm:gap-3 lg:gap-4 pt-10 sm:pt-0">
            {iconSet.flat().map((icon, idx) => (
              <img
                key={idx}
                src={icon}
                className="bg-white rounded w-28 h-28 md:w-36 md:h-36 lg:w-64 lg:h-64"
                alt="slot icon"
              />
            ))}
          </div>
        </div>
        <aside className="w-full box-border lg:w-1/2 flex flex-col justify-center items-center rounded border-0 lg:border-4 lg:border-[#444b97] lg:gap-10 py-2 gap-1 order-first lg:order-2">
          <h1 className="text-2xl sm:text-3xl font-bold mb-8">
            Place Your Bet
          </h1>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {betOptions.map((value, idx) => (
              <button
                key={value}
                value={value}
                onClick={chooseBetMoney}
                className={`${colorsBtns[idx]} text-white w-16 h-10 sm:w-20 sm:h-12 rounded`}
              >
                {value}
              </button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-5 mt-2">
            <p>Your bet: {defaultBetMoney}</p>
            <p> Your money: {money}</p>
          </div>
          <button
            onClick={spinningTheSlot}
            className="bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition-colors w-32 py-3 fixed bottom-8 left-1/2 -translate-x-1/2 z-50 lg:static lg:mt-4 lg:mb-10 lg:translate-x-0"
          >
            Spin!
          </button>
        </aside>
      </div>
    </div>
  );
}
