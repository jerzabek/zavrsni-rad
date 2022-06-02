import React, { ReactElement, useEffect, useState } from 'react'
import AnnotatedElement from './AnnotatedElement'

export interface DBPediaResponse {
  annotation: DBPediaAnnotation
}

export interface DBPediaAnnotation {
  "@text": string
  "surfaceForm": AnnotationInstance[]
}

export interface AnnotationInstance {
  "@name": string
  "@offset": number
  "resource": AnnotationResource
}

interface AnnotationResource {
  "@label": string
  "@types": string
  "@uri": string
}


interface AnnotatedTextProps {
  annotationDetails: DBPediaAnnotation
}

export default function AnnotatedText({ annotationDetails }: AnnotatedTextProps): ReactElement {
  const [content, setContent] = useState<Array<ReactElement | string>>([])

  useEffect(() => {
    let elements = []
    let content = annotationDetails['@text']
    let beginingOffset = 0;


    annotationDetails.surfaceForm.sort((a, b) => a['@offset'] - b['@offset']).forEach((annotation: AnnotationInstance, index) => {
      if (annotation['@offset'] < beginingOffset) {
        // There is a nested annotation - e.g. <span>Holy Roman Emperor <span>Leopold I</span></span>
        // Ignore this case
        return;
      }

      const text = content.substring(0, annotation['@offset'] - beginingOffset)
      beginingOffset = beginingOffset + text.length + annotation['@name'].length
      content = content.replace(text, '').replace(annotation['@name'], '')

      const currentAnnotatedElement = (
        <AnnotatedElement key={index} itemtype={annotation.resource['@types']} label={annotation['@name']} />
      )

      elements = [...elements, text, currentAnnotatedElement]
    })

    setContent([...elements, content])
  }, [annotationDetails])

  function renderElements(): ReactElement[] {
    return content.map((annotatedElement, index) => <React.Fragment key={index}>{annotatedElement}</React.Fragment>)
  }

  return (
    <>
      {renderElements()}
    </>
  )
}