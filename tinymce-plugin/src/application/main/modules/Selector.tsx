import React, { useRef, useEffect, ReactElement } from 'react'
import Select from 'react-select'
import { SchemaType } from '../../../model/Schema'
import { SmallText } from '../../components/Typography'
import autoAnimate from '@formkit/auto-animate'
import styled from 'styled-components'

interface SelectorProps {
  selection: SchemaType
  setSelection: (newValue: SchemaType) => void
  options: SchemaType[]
  name: string
  description: string
}

const SelectionContainer = styled.div`
  margin: 2em 0;
`

export default function Selector({ selection, setSelection, options, name, description }: SelectorProps): ReactElement {
  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  return (
    <div ref={parent}>
      <SelectionContainer>
        <Select
          classNamePrefix="select"
          name={name}
          onChange={(selection: SchemaType) => setSelection(selection)}
          value={selection}
          options={options}
        />
      </SelectionContainer>

      {
        selection && (
          <>
            <SmallText>{description}</SmallText>
            <p>{selection.comment}</p>
          </>
        )
      }
    </div>
  )
}