import { createContext } from 'react'
import { ResolveFunctionType, RichNode } from '../../model/RichNode'

export interface AnnotationContextTypes {
  node?: RichNode
  resolve: ResolveFunctionType
  reject: () => void
}

const defaultValue = {}

export const AnnotationContext = createContext<AnnotationContextTypes>(defaultValue as AnnotationContextTypes)
export const AnnotationContextProvider = AnnotationContext.Provider