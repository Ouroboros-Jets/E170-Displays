import { PropsWithChildren } from 'react'
import './index.layout.scss'

export function IndexLayout({ children }: PropsWithChildren) {
  return <div id="index-layout">{children}</div>
}

export function IndexLayoutTitle({ children }: PropsWithChildren) {
  return <div className="title">{children}</div>
}
