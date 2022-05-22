import React from 'react'
import { createRoot } from 'react-dom/client'
import { ResolveFunctionType, RichNode } from 'src/model/RichNode';
import TypeUI from './main/TypeUI';
import PropertyUI from './main/PropertyUI';
import { AnnotationContextProvider } from './main/AnnotationContext'

// We define variables for 2 react UIs, the schema type UI and schema property UI
let thingRoot = undefined
let thingRootElement = undefined

let propertyRoot = undefined
let propertyRootElement = undefined

function generateRoot(): Element {
  const rootElement = document.createElement('div')

  const id = 'zavrad-root-' + (Math.floor(Math.random() * 1000));
  rootElement.setAttribute('id', id)

  document.body.appendChild(rootElement)

  return rootElement;
}

export function mountReactTypeApp(resolveFunction: ResolveFunctionType, rejectFunction: () => void, node: RichNode): void {
  thingRootElement = generateRoot()
  thingRoot = createRoot(thingRootElement)

  thingRoot.render(
    <React.StrictMode>
      <AnnotationContextProvider value={{ resolve: resolveFunction, reject: rejectFunction, node }}>
        <TypeUI />
      </AnnotationContextProvider>
    </React.StrictMode >
  );
}

export function mountReactPropertyApp(resolveFunction: ResolveFunctionType, rejectFunction: () => void, node: RichNode): void {
  propertyRootElement = generateRoot()
  propertyRoot = createRoot(propertyRootElement)

  propertyRoot.render(
    <React.StrictMode>
      <AnnotationContextProvider value={{ resolve: resolveFunction, reject: rejectFunction, node }}>
        <PropertyUI />
      </AnnotationContextProvider>
    </React.StrictMode >
  );
}

export function unmountReactTypeApp(): void {
  if (thingRootElement == undefined || thingRoot == undefined) {
    return
  }

  thingRoot.unmount();
  thingRootElement.remove()
}

export function unmountReactPropertyApp(): void {
  if (propertyRootElement == undefined || propertyRoot == undefined) {
    return
  }

  propertyRoot.unmount();
  propertyRootElement.remove()
}