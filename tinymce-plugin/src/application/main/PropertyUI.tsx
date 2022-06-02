import React, { ReactElement, useContext, useState, useEffect, useRef, useMemo } from 'react'
import { Modal, ModalContent } from '../components/Modal'
import { AnnotationContext } from './AnnotationContext'
import UserControls from './modules/UserControls'
import AnnotateProperty from './modules/AnnotateProperty'
import { SmallText } from '../components/Typography'
import SchemaTypes from '../../schema.props.json'
import { SchemaType } from '../../model/Schema'
import autoAnimate from '@formkit/auto-animate'
import Selector from './modules/Selector'
import parse from 'html-react-parser'

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

  const [nodeValue, setNodeValue] = useState(node)

  const schemaType = useMemo(() => findSchemaType(nodeValue.itemprop), [nodeValue.itemprop])

  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  const [editMode, setEditMode] = useState(false)
  const [editSelection, setEditSelection] = useState<SchemaType>()
  const [isNodeEdited, setIsNodeEdited] = useState(false)

  const nodeContent = nodeValue.content as HTMLElement

  function editAnnotation() {
    setEditMode(true)
  }

  function cancelEdit() {
    setEditMode(false)
  }

  function finishEditing() {
    setEditMode(false)

    if (!editSelection) return

    if (editSelection.value === nodeValue.itemprop) return

    setNodeValue(node => { return { ...node, itemprop: editSelection.value } })

    setIsNodeEdited(true)
  }

  function saveEdit() {
    resolve(nodeValue)
  }

  if (editMode) {
    return (
      <>
        <p>Editing current type: {nodeValue.itemprop}</p>
        <SmallText>{nodeContent.innerText}</SmallText>

        <Selector
          selection={editSelection}
          setSelection={setEditSelection}
          options={SchemaTypes}
          name='itemprop'
          description='Property description:' />

        <UserControls applyAction={finishEditing} applyText='Save' cancelAction={cancelEdit} />
      </>
    )
  }

  return (
    <>
      <SmallText>Property: {nodeValue.itemprop} {nodeValue.itemscope ? <i>(also {nodeValue.itemtype})</i> : ''}</SmallText>
      <p>{nodeContent.innerText}</p>

      <p>{schemaType && schemaType.comment ? parse(schemaType.comment) : '-'}</p>

      {
        isNodeEdited ? (
          <UserControls applyAction={saveEdit} applyText='Save' cancelAction={reject} />
        ) : (
          <UserControls applyAction={editAnnotation} applyText='Edit' cancelAction={reject} />
        )
      }
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