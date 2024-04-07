import { PropsWithChildren, ReactNode } from 'react'
import { match, P } from 'ts-pattern'

const symbols = {
  left: {
    bold: 'e',
    long: 'c',
    small: 'a'
  },
  right: {
    bold: 'f',
    long: 'd',
    small: 'b'
  }
} as const

type ArrowProps = {
  variant?: 'bold' | 'long' | 'small'
} & ({ left: true } | { right: true })

export function Arrow({ children, variant = 'small', ...props }: PropsWithChildren<ArrowProps>) {
  return (
    <span className="font-symbols">
      {match(props)
        .with({ left: true }, { right: true }, () => symbols['right' in props ? 'right' : 'left'][variant])
        .otherwise(() => children)}
    </span>
  )
}
