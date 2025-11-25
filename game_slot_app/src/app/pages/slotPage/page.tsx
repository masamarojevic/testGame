"use client";
import React, { useState, useEffect } from "react";

export default function slotPage() {
  const BRAIN: string = "/slotIcons/brain.png";
  const EYE: string = "/slotIcons/eye.png";
  const HEAD: string = "/slotIcons/head.png";
  const LIPS: string = "/slotIcons/lips.png";
  const NOSE: string = "/slotIcons/nose.png";
  const SKULL: string = "/slotIcons/skull.png";
  const TONGUE: string = "/slotIcons/tongue.png";

  const icons: string[] = [BRAIN, EYE, HEAD, LIPS, NOSE, SKULL, TONGUE];

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

  //zacne se en set z random 3x3 slikami // pol se ta set zrola  v nov set 3x3 ki doloci zmago||izgubo
  //[][] 2d array od string ikon zacne []
  const [iconSet, setIconSet] = useState<string[][]>([]);

  useEffect(() => {
    setIconSet(generete3x3Grid());
  }, []);

  //tvoj denar ki se zacne z 500
  const [money, setMoney] = useState(500);
  //to so gumbi kjer si zberes koliko denarja od nastetega bos stavil
  let betOptions: number[] = [20, 50, 100, 200];
  // klicemo setBetMoney na gumb ki bo izbral vrednost in to postane pol betMoney.. naceloma user lahko klikne spin
  // brez da zbere vrednost in zato je lahko null od zacetka
  const [betMoney, setBetMoney] = useState<number | null>(null);

  //klik na eden izmed gumbov
  function chooseBetMoney(e: React.MouseEvent<HTMLButtonElement>) {
    //kar je user zbral z misko postane value za set bet money
    const value = Number(e.currentTarget.value);
    setBetMoney(value);
  }

  //klik na spin
  function spinningTheSlot() {
    //ce se ni nic zbralo -> alert
    if (betMoney === null) {
      console.log("choose bet money");
      return;
    }
    //prvo tvoj denar minus bet money
    let m = money - betMoney;
    //kasneje naredi se logiko za 3 v vrsto
    let win: boolean = false;

    //in ce je zmaga tvoj m je zdej bet pa se krat 2 cene pa m minus bet
    if (win) {
      m += betMoney * 2;
    } else {
      m -= betMoney;
    }
    setMoney(m);
  }
  return (
    <div className="min-h-screen flex justify-center items-center flex-col overflow-hidden">
      <h1>hello, set bet money</h1>
      <div className="space-x-4">
        {betOptions.map((value) => (
          <button
            key={value}
            value={value}
            onClick={chooseBetMoney}
            className="bg-slate-500"
          >
            {value}
          </button>
        ))}
      </div>
      <p> your money: {money}</p>
      <button onClick={spinningTheSlot}>Spin!</button>

      <div className="grid grid-cols-3 grid-rows-3 gap-2">
        {iconSet.flat().map((icon, idx) => (
          <img
            key={idx}
            src={icon}
            className="bg-white border-4 p-2 rounded w-64 h-64"
            alt="slot icon"
          />
        ))}
      </div>
    </div>
  );
}
