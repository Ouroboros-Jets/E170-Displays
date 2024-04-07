/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type PropsWithChildren, createContext } from 'react'

type ScratchpadContextValue = {
  value: string
}

const ScratchpadContext = createContext<ScratchpadContextValue>({} as ScratchpadContextValue)

export function ScratchpadProvider({ children }: PropsWithChildren): JSX.Element {
  return <ScratchpadContext.Provider value={{ value: 'Hello, world!' }}>{children}</ScratchpadContext.Provider>
}
