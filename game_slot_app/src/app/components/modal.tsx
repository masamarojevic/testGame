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
      msg = "You won!";
      break;
    }
    case ModalOptions.Lose: {
      msg = "You lose!";
      break;
    }
    case ModalOptions.outOfMoney: {
      msg = "Out of money, reload page!";
      break;
    }
    case ModalOptions.noBetMoney: {
      msg = "You have not bet any money!";
      break;
    }
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
      <div className="bg-teal-900 text-white p-8 rounded-xl">
        <p>{msg}</p>
      </div>
    </div>
  );
}
