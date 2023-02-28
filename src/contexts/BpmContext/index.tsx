import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useState } from "react";

interface BpmContextData {
  bpm: number;
  beats: number;
  handleChangeBpm: (beats: number) => void;
  handleChangeBeats: (beats: number) => void;
}

interface BpmProviderProps {
  children: ReactNode;
}

export const BpmContext = createContext({} as BpmContextData);

export function BpmProvider({children}: BpmProviderProps) {
  const [bpm, setBpm] = useState(100);
  const [beats, setBeats] = useState(4);

  const handleChangeBpm = useCallback((beats) => {
    setBpm(beats)
  }, [])

  const handleChangeBeats = useCallback((beats) => {
    setBeats(beats)
  }, [])

  return (
    <BpmContext.Provider value={{
      bpm,
      beats,
      handleChangeBpm,
      handleChangeBeats
    }}>
      {children}
    </BpmContext.Provider>
  )
}