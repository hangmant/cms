import React from 'react'

type SeparatorProps = {
  h?: number
  v?: number
}

const Separator = ({ v = 0, h = 0 }: SeparatorProps) => {
  return (
    <div
      style={{
        padding: `${v}px ${h}px`,
      }}
    ></div>
  )
}

export default Separator
