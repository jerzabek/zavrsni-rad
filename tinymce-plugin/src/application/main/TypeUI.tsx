import React, { ReactElement, useContext, useState, useEffect, useMemo, useRef } from 'react'
import { Modal, ModalContent } from '../components/Modal'
import { AnnotationContext } from './AnnotationContext'
import UserControls from './modules/UserControls'
import AnnotateType from './modules/AnnotateType'
import { SchemaType } from '../../model/Schema'
import { SmallText } from '../components/Typography'
import SchemaTypes from '../../schema.types.json'
import Selector from './modules/Selector'
import autoAnimate from '@formkit/auto-animate'

export default function TypeUI(): ReactElement {
  const { node } = useContext(AnnotationContext)

  if (typeof node.content === 'object') {
    return (
      <Modal>
        <ModalContent>
          <h3>Existing thing annotation</h3>

          <ExistingAnnotation />
        </ModalContent>
      </Modal>
    )
  }

  return (
    <Modal>
      <ModalContent>
        <h3>Annotating new thing</h3>

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

  const schemaType = useMemo(() => findSchemaType(nodeValue.itemtype), [nodeValue.itemtype])

  const [childProperties, setChildProperties] = useState<Element[]>([])
  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  const [editMode, setEditMode] = useState(false)
  const [editSelection, setEditSelection] = useState<SchemaType>()
  const [isNodeEdited, setIsNodeEdited] = useState(false)

  const nodeContent = nodeValue.content as HTMLElement

  useEffect(() => {
    const children: Element[] = []

    nodeContent.querySelectorAll('span[itemprop]').forEach(elem => children.push(elem))

    setChildProperties(children)
  }, [])

  function editAnnotation() {
    setEditMode(true)
  }

  function cancelEdit() {
    setEditMode(false)
  }

  function finishEditing() {
    setEditMode(false)

    if (!editSelection) return

    if (editSelection.value === nodeValue.itemtype) return

    setNodeValue(node => { return { ...node, itemscope: true, itemtype: editSelection.value } })

    setIsNodeEdited(true)
  }

  function saveEdit() {
    resolve(nodeValue)
  }

  if (editMode) {
    return (
      <>
        <p>Editing current type: {nodeValue.itemscope ? nodeValue.itemtype : '-'}</p>
        <SmallText>{nodeContent.innerText}</SmallText>

        <Selector
          selection={editSelection}
          setSelection={setEditSelection}
          options={SchemaTypes}
          name='itemtype'
          description='Type description:' />

        <UserControls applyAction={finishEditing} applyText='Save' cancelAction={cancelEdit} />
      </>
    )
  }

  return (
    <>
      <SmallText>Type: {nodeValue.itemscope ? nodeValue.itemtype : '-'}</SmallText>
      <p>{nodeContent.innerText}</p>

      <p>{schemaType.comment}</p>

      {childProperties?.length > 0 && (
        <>
          <SmallText>Properties:</SmallText>
          {
            childProperties.map((elem, index) => (
              <p key={index}><a href={elem.getAttribute('itemprop')} target="_blank">{elem.getAttribute('itemprop')}</a>: {elem.innerHTML}</p>
            ))
          }
        </>
      )}

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

      <AnnotateType />
    </>
  )
}