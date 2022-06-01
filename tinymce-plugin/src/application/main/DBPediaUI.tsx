import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { Modal, ModalContent } from '../components/Modal'
import { SmallText } from '../components/Typography'
import { DBPediaContext } from './DBPediaContext'
import UserControls from './modules/UserControls'
import AnnotatedText, { DBPediaResponse, DBPediaAnnotation } from './modules/AnnotatedText'
import styled from 'styled-components'

const DBPEDIA_SPOTLIGHT_API = 'https://api.dbpedia-spotlight.org/en/candidates?text='

const Container = styled.div`
  margin-bottom: 20px;
`

export default function DBPediaUI(): ReactElement {
  const { content, resolve, reject } = useContext(DBPediaContext)

  const [annotationData, setAnnotationData] = useState<DBPediaAnnotation>()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function annotate() {
    setLoading(true)
    const url = DBPEDIA_SPOTLIGHT_API + encodeURIComponent(content)
    const headers = {
      'accept': 'application/json'
    }

    fetch(url, { headers })
      .then(response => response.json())
      .then((response: DBPediaResponse) => {
        if (!('surfaceForm' in response.annotation)) {
          // If no annotatios were found we just set up empty array
          return { annotation: { ...response.annotation, surfaceForm: [] } }
        }

        if (!Array.isArray(response.annotation.surfaceForm)) {
          // If the surfaceFrom property only contains one value it will be just the object, so we wrap it in an array
          response.annotation.surfaceForm = [response.annotation.surfaceForm]
        }

        return response
      })
      .then(response => {
        // Some annotations do not specify any types and therefor are useless
        response.annotation.surfaceForm = response.annotation.surfaceForm.filter(annotation => !!annotation.resource['@types'])

        return response
      })
      .then(({ annotation }: DBPediaResponse) => setAnnotationData(annotation))
      .catch(err => setError('Error occurred. ' + err))
  }

  function saveAnnotations() {
    // Perfect solution would be to use ReactDOMServer.renderToStaticMarkup() method but rollup simply does not care and breaks upon importing said method & library
    resolve(annotationData)
  }

  useEffect(() => {
    setLoading(false)
  }, [annotationData])

  return (
    <Modal>
      <ModalContent>
        <h3>Annotate using DBPedia</h3>
        <SmallText>Using DBPedia Spotlight API you can automatically detect possible annotations in the text you selected.</SmallText>

        <Container>
          {
            annotationData ? (
              <AnnotatedText annotationDetails={annotationData} />
            ) : (
              <p>{content}</p>
            )
          }

          {
            error && (
              <>
                <SmallText>Error:</SmallText>
                <p>{error}</p>
              </>
            )
          }
        </Container>

        {
          annotationData ? (
            <UserControls applyAction={saveAnnotations} applyText='Save' cancelAction={reject} />
          ) : (
            <UserControls applyAction={annotate} applyDisabled={loading} applyText='Annotate' cancelAction={reject} />
          )
        }

      </ModalContent>
    </Modal>
  )
}