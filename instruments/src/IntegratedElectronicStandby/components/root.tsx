import React from 'react'

type T_IESRootProps = {
  isAligning: boolean
}

export const IESRoot: React.FC<T_IESRootProps> = (props: T_IESRootProps): JSX.Element => {
  return (
    <div>
      <h1>IESRoot</h1>
    </div>
  )
}
