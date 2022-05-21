import React, { ReactElement, useState } from 'react'

interface UIProps {
  resolve: (whatever: string) => void
}

export default function UI({ resolve }: UIProps): ReactElement {
  const [number, setNumber] = useState(0)

  return (
    <>
      <h1>Number: {number}</h1>
      <button onClick={() => setNumber(number => number + 1)}>Click</button>
      <button onClick={() => resolve("woah: " + number)}>Finish it</button>
    </>
  )
}