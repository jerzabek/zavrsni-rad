import React, { ReactElement, useContext, useState, useRef, useEffect } from 'react'
import { AnnotationContext } from '../AnnotationContext'
import { RichNode } from '../../../model/RichNode'
import UserControls from './UserControls'
import styled from 'styled-components'
import Select from 'react-select'
import { SchemaType } from '../../../model/Schema'
import SchemaTypes from '../../../schema.types.json'
import { SmallText } from '../../components/Typography'
import autoAnimate from '@formkit/auto-animate'

const SelectionContainer = styled.div`
  margin: 2em 0;
`

export default function AnnotateType(): ReactElement {
  const { node, resolve, reject } = useContext(AnnotationContext)
  const [selection, setSelection] = useState<SchemaType>()

  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  function applyAnnotation() {
    if (!selection) return

    const resultNode: RichNode = { ...node, itemscope: true, itemtype: selection.value }

    resolve(resultNode)
  }

  return (
    <div ref={parent}>
      <SelectionContainer>
        <Select
          classNamePrefix="select"
          name="itemtype"
          onChange={(selection: SchemaType) => setSelection(selection)}
          value={selection}
          options={SchemaTypes}
        />
      </SelectionContainer>

      {
        selection && (
          <>
            <SmallText>Type description:</SmallText>
            <p>{selection.comment}</p>
          </>
        )
      }

      <UserControls applyDisabled={!selection} applyAction={applyAnnotation} cancelAction={reject} />
    </div>
  )
}