import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { AnnotationContext } from '../AnnotationContext'
import { RichNode } from '../../../model/RichNode'
import UserControls from './UserControls'
import { SchemaType } from '../../../model/Schema'
import SchemaTypes from '../../../schema.types.json'
import Selector from './Selector'
import { SmallText } from '../../../application/components/Typography'
import styled from 'styled-components'
import useDBPedia from './UseDBPedia'

const PillContainer = styled.div`
  display: flex;
  font-size: 0.8rem;
  margin-top: 5px;
`

const Pill = styled.span`
  padding: 0.1em 0.8em;
  border-radius: 30px;
  background-color: rgb(0, 112, 243);
  border: none;
  color: white;
  margin-right: 10px;

  &:hover {
    cursor:pointer;
  }
`

export function findSchemaType(id: string): SchemaType {
  return SchemaTypes.find(({ value }) => value === id)
}

interface Recommendations {
  [schemaName: string]: SchemaType
}

export default function AnnotateType(): ReactElement {
  const { node, resolve, reject } = useContext(AnnotationContext)
  const [selection, setSelection] = useState<SchemaType>()
  const { annotate, annotationData, error, loading } = useDBPedia()
  const [recommendations, setRecommendations] = useState<Recommendations>()

  function applyAnnotation() {
    if (!selection) return

    const resultNode: RichNode = { ...node, itemscope: true, itemtype: selection.value }

    resolve(resultNode)
  }

  useEffect(() => {
    if (!node.content) {
      return
    }

    annotate(node.content as string)
  }, [])

  useEffect(() => {
    if (!annotationData) {
      return
    }

    if (!annotationData.surfaceForm) {
      return
    }

    const recommendations = {}

    annotationData.surfaceForm.forEach(annotation => {
      const types = annotation.resource['@types'].split(", ")

      for (const type of types) {
        if (type in recommendations) {
          continue
        }

        // We only work with Schema.org, we filter out everything else
        if (!type.startsWith("Schema:")) {
          continue
        }

        // original type is e.g. "Schema:Person"
        let schemaName = type.split(":")[1]
        schemaName = "https://schema.org/" + schemaName

        const schemaType = findSchemaType(schemaName)

        if (!schemaType) {
          // If this is an unidentified schema type we ignore it
          continue
        }

        recommendations[type] = schemaType
      }
    })

    if(Object.keys(recommendations).length === 0) {
      // Nothing found
      return
    }

    setRecommendations(recommendations)
  }, [annotationData])

  return (
    <>
      {
        loading ? (
          <SmallText>Loading recommendations...</SmallText>
        ) : (
          error ? (
            <SmallText>No recommendations available. Please choose by yourself</SmallText>
          ) : (
            recommendations ? (<>
              <SmallText>Recommendations:</SmallText>
              <PillContainer>
                {
                  Object.values(recommendations).map(annotation => (
                    <Pill onClick={() => setSelection(annotation)}>{annotation.label}</Pill>

                  ))
                }
              </PillContainer>
            </>) : (
              <SmallText>No recommendations available. Please choose by yourself</SmallText>
            )
          )
        )
      }

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