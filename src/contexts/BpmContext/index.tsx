import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useState } from "react";

interface BpmContextData {
  bpm: number;
  handleChangeBpm: (beats: number) => void;
}

interface BpmProviderProps {
  children: ReactNode;
}

export const BpmContext = createContext({} as BpmContextData);

export function BpmProvider({children}: BpmProviderProps) {
  const [bpm, setBpm] = useState(100);

  const handleChangeBpm = useCallback((beats) => {
    setBpm(beats)
  }, [])

  return (
    <BpmContext.Provider value={{
      bpm,
      handleChangeBpm
    }}>
      {children}
    </BpmContext.Provider>
  )
}