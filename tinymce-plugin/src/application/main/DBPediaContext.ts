import { createContext } from 'react'
import { DBPediaAnnotation } from './modules/AnnotatedText'

export interface DBPediaContextTypes {
  content: string
  resolve: (annotated: DBPediaAnnotation) => void
  reject: () => void
}

const defaultValue = {}

export const DBPediaContext = createContext<DBPediaContextTypes>(defaultValue as DBPediaContextTypes)
export const DBPediaContextProvider = DBPediaContext.Provider