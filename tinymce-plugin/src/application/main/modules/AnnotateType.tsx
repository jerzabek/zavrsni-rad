import React, { ReactElement, useContext, useState } from 'react'
import { AnnotationContext } from '../AnnotationContext'
import { RichNode } from '../../../model/RichNode'
import UserControls from './UserControls'
import { SchemaType } from '../../../model/Schema'
import SchemaTypes from '../../../schema.types.json'
import Selector from './Selector'

export default function AnnotateType(): ReactElement {
  const { node, resolve, reject } = useContext(AnnotationContext)
  const [selection, setSelection] = useState<SchemaType>()

  function applyAnnotation() {
    if (!selection) return

    const resultNode: RichNode = { ...node, itemscope: true, itemtype: selection.value }

    resolve(resultNode)
  }

  return (
    <>
      <Selector
        selection={selection}
        setSelection={setSelection}
        options={SchemaTypes}
        name='itemtype'
        description='Type description:' />

      <UserControls applyDisabled={!selection} applyAction={applyAnnotation} cancelAction={reject} />
    </>
  )
}