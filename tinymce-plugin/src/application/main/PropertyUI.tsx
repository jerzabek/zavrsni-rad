import React, { ReactElement, useContext, useMemo } from 'react'
import { Modal, ModalContent } from '../components/Modal'
import { AnnotationContext } from './AnnotationContext'
import UserControls from './modules/UserControls'
import AnnotateProperty from './modules/AnnotateProperty'
import { SmallText } from '../components/Typography'
import SchemaTypes from '../../schema.props.json'
import { SchemaType } from '../../model/Schema'

export default function PropertyUI(): ReactElement {
  const { node } = useContext(AnnotationContext)

  if (typeof node.content === 'object') {
    return (
      <Modal>
        <ModalContent>
          <h3>Existing property annotation</h3>

          <ExistingAnnotation />
        </ModalContent>
      </Modal>
    )
  }

  return (
    <Modal>
      <ModalContent>
        <h3>Annotating new property</h3>

        <NewAnnotation />
      </ModalContent>
    </Modal>
  )
}

function findSchemaType(id: string): SchemaType {
  return SchemaTypes.find(({ value }) => value === id)
}

function ExistingAnnotation(): ReactElement {
  const { node, resolve, reject } = useContext(AnnotationContext)
  const schemaType = useMemo(() => findSchemaType(node.itemprop), [node.itemprop])

  const nodeContent = node.content as HTMLElement

  function applyAnnotation() {
    resolve(node)
  }

  return (
    <>
      <SmallText>Property: {node.itemprop} {node.itemscope ? <i>(also {node.itemtype})</i> : ''}</SmallText>
      <p>{nodeContent.innerText}</p>

      <p>{schemaType.comment}</p>

      <UserControls applyAction={applyAnnotation} applyText='Save' cancelAction={reject} />
    </>
  )
}

function NewAnnotation(): ReactElement {
  const { node } = useContext(AnnotationContext)

  return (
    <>
      <SmallText>Annotating:</SmallText>
      <p>{node.content as string}</p>

      <AnnotateProperty />
    </>
  )
}