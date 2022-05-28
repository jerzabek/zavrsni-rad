import React, { ReactElement, useContext, useState } from 'react'
import { AnnotationContext } from '../AnnotationContext'
import { RichNode } from '../../../model/RichNode'
import UserControls from './UserControls'
import SchemaTypes from '../../../schema.props.json'
import { SchemaType } from '../../../model/Schema'
import Selector from './Selector'

export default function AnnotateProperty(): ReactElement {
  const { node, resolve, reject } = useContext(AnnotationContext)
  const [selection, setSelection] = useState<SchemaType>()

  function applyAnnotation() {
    if (!selection) return

    const resultNode: RichNode = { ...node, itemprop: selection.value }

    resolve(resultNode)
  }

  return (
    <>
      <Selector
        selection={selection}
        setSelection={setSelection}
        options={SchemaTypes}
        name='itemprop'
        description='Property description:' />

      <UserControls applyDisabled={!selection} applyAction={applyAnnotation} cancelAction={reject} />
    </>
  )
}