import { useEffect, useState } from 'react'
import { DBPediaResponse, DBPediaAnnotation } from './AnnotatedText'

const DBPEDIA_SPOTLIGHT_API = 'https://api.dbpedia-spotlight.org/en/candidates?text='

interface useDBPedia {
  annotate: (text: string) => void,
  annotationData: DBPediaAnnotation,
  error: string,
  loading: boolean
}

export default function useDBPedia(): useDBPedia {
  const [annotationData, setAnnotationData] = useState<DBPediaAnnotation>()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function annotate(text: string) {
    setLoading(true)

    const url = DBPEDIA_SPOTLIGHT_API + encodeURIComponent(text)
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
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    setLoading(false)
  }, [annotationData])

  return { annotate, annotationData, error, loading }
}