import React, { ReactElement, useContext, useState, useEffect, useMemo, useRef } from 'react'
import { Modal, ModalContent } from '../components/Modal'
import { AnnotationContext } from './AnnotationContext'
import UserControls, { UserControlsWithDelete } from './modules/UserControls'
import AnnotateType, { findSchemaType } from './modules/AnnotateType'
import { SchemaType } from '../../model/Schema'
import { SmallText } from '../components/Typography'
import SchemaTypes from '../../schema.types.json'
import Selector from './modules/Selector'
import autoAnimate from '@formkit/auto-animate'
import parse from 'html-react-parser'

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


function ExistingAnnotation(): ReactElement {
  const { node, resolve, reject } = useContext(AnnotationContext)

  const [nodeValue, setNodeValue] = useState(node)

  const schemaTypes: SchemaType[] = useMemo(() => nodeValue.itemtype.split(" ").map(type => findSchemaType(type)).filter(type => !!type), [nodeValue.itemtype])

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

  function removeAnnotation() {
    delete nodeValue.itemscope
    delete nodeValue.itemtype
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

      {
        schemaTypes.length == 1 ? (
          <p>{parse(schemaTypes[0].comment)}</p>
        ) : (
          schemaTypes.map(type => (
            <p>{type.label}: {parse(type.comment)}</p>
          ))
        )
      }

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
          <UserControlsWithDelete removeAction={removeAnnotation} applyAction={saveEdit} applyText='Save' cancelAction={reject} />
        ) : (
          <UserControlsWithDelete removeAction={removeAnnotation} applyAction={editAnnotation} applyText='Edit' cancelAction={reject} />
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