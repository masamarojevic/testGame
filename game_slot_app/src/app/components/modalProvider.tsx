"use client";
import { useContext, useState, createContext, ReactNode } from "react";
import { ModalOptions } from "../enums/optionEnums";

//na zac je null drugae pa je tipa
interface ModalOption {
  type: ModalOptions | null;
  //ko se odpre modal bo bil eden od tipov enuma
  openModal: (type: ModalOptions) => void;
  closeModal: () => void;
}

//context
//na zacetku je prazen oz undefined
const ModalContext = createContext<ModalOption | undefined>(undefined);

//poglej si kaj je ze react node
export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [type, setType] = useState<ModalOptions | null>(null);
  console.log("modal type", type);
  const openModal = (modalType: ModalOptions) => setType(modalType);
  const closeModal = () => setType(null);
  return (
    <ModalContext.Provider
      value={{
        type,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
