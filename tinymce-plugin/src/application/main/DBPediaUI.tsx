import React, { ReactElement, useContext } from 'react'
import { Modal, ModalContent } from '../components/Modal'
import { SmallText } from '../components/Typography'
import { DBPediaContext } from './DBPediaContext'
import UserControls from './modules/UserControls'
import AnnotatedText from './modules/AnnotatedText'
import styled from 'styled-components'
import useDBPedia from './modules/UseDBPedia'

const Container = styled.div`
  margin-bottom: 20px;
`

export default function DBPediaUI(): ReactElement {
  const { content, resolve, reject } = useContext(DBPediaContext)
  const { annotate, annotationData, error, loading } = useDBPedia()

  function saveAnnotations() {
    // Perfect solution would be to use ReactDOMServer.renderToStaticMarkup() method but rollup simply does not care and breaks upon importing said method & library
    resolve(annotationData)
  }

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
            <UserControls applyAction={() => annotate(content)} applyDisabled={loading} applyText='Annotate' cancelAction={reject} />
          )
        }

      </ModalContent>
    </Modal>
  )
}