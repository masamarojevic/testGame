"use client";
import { useEffect } from "react";
import { ModalOptions } from "../enums/optionEnums";
import { useModal } from "./modalProvider";
export default function Modal() {
  let msg: string = "";
  const { type, closeModal } = useModal();

  useEffect(() => {
    if (!type) return;
    const showMsg = setTimeout(() => {
      closeModal();
    }, 2000);
    return () => {
      clearTimeout(showMsg);
    };
  }, [type]);

  if (!type) return null;

  switch (type) {
    case ModalOptions.Win: {
      msg = "You win!";
      break;
    }
    case ModalOptions.Lose: {
      msg = "You lose!";
      break;
    }
    case ModalOptions.outOfMoney: {
      msg = "Out of money, bet less or reload page!";
      break;
    }
    case ModalOptions.noBetMoney: {
      msg = "You have not bet any money!";
      break;
    }
    case ModalOptions.ExtraWin: {
      msg = "Double match!";
    }
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
      <div className="bg-orange-500 text-white p-12 rounded-3xl shadow-2xl border-4 border-white text-4xl font-bold flex justify-center items-center animate-bounce">
        <p>{msg}</p>
      </div>
    </div>
  );
}
