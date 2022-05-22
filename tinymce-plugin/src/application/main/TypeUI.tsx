import React, { ReactElement, useContext, useState, useEffect, useMemo } from 'react'
import { Modal, ModalContent } from '../components/Modal'
import { AnnotationContext } from './AnnotationContext'
import UserControls from './modules/UserControls'
import AnnotateType from './modules/AnnotateType'
import { SchemaType } from '../../model/Schema'
import { SmallText } from '../components/Typography'
import SchemaTypes from '../../schema.types.json'

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
  const schemaType = useMemo(() => findSchemaType(node.itemtype), [node.itemtype])

  const [children, setChildren] = useState<Element[]>([])
  const nodeContent = node.content as HTMLElement

  useEffect(() => {
    const children: Element[] = []

    nodeContent.querySelectorAll('span[itemprop]').forEach(elem => children.push(elem))

    setChildren(children)
  }, [])

  function applyAnnotation() {
    resolve(node)
  }

  return (
    <div>
      <SmallText>Type: {node.itemscope ? node.itemtype : '-'}</SmallText>
      <p>{nodeContent.innerText}</p>

      <p>{schemaType.comment}</p>

      {children?.length > 0 && (
        <>
          <SmallText>Properties:</SmallText>
          {
            children.map((elem, index) => (
              <p key={index}><a href={elem.getAttribute('itemprop')} target="_blank">{elem.getAttribute('itemprop')}</a>: {elem.innerHTML}</p>
            ))
          }
        </>
      )}

      <UserControls applyAction={applyAnnotation} applyText='Save' cancelAction={reject} />
    </div>
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