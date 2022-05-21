import React from 'react'
import { createRoot } from 'react-dom/client'
import UI from './components/UI';

let root = undefined

export function setupReactApp(resolveFunction: (whatever: string) => void): void {
  root = createRoot(document.getElementById('root'))

  root.render(
    <React.StrictMode>
      <UI resolve={resolveFunction}/>
    </React.StrictMode>
  );
}

export function unmountReactApp(): void {
  if (typeof root === 'undefined') {
    return;
  }

  root.unmount();
}