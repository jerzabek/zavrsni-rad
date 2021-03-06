import React from 'react';
import { createRoot } from 'react-dom/client';
import TypeUI from './main/TypeUI';
import PropertyUI from './main/PropertyUI';
import DBPediaUI from './main/DBPediaUI';
import { AnnotationContextProvider } from './main/AnnotationContext';
import { DBPediaContextProvider } from './main/DBPediaContext';
// We define variables for 2 react UIs, the schema type UI and schema property UI
var thingRoot = undefined;
var thingRootElement = undefined;
var propertyRoot = undefined;
var propertyRootElement = undefined;
var dbpediaRoot = undefined;
var dbpediaRootElement = undefined;
function generateRoot() {
    var rootElement = document.createElement('div');
    var id = 'zavrad-root-' + (Math.floor(Math.random() * 1000));
    rootElement.setAttribute('id', id);
    document.body.appendChild(rootElement);
    return rootElement;
}
export function mountReactTypeApp(resolveFunction, rejectFunction, node) {
    thingRootElement = generateRoot();
    thingRoot = createRoot(thingRootElement);
    thingRoot.render(React.createElement(React.StrictMode, null,
        React.createElement(AnnotationContextProvider, { value: { resolve: resolveFunction, reject: rejectFunction, node: node } },
            React.createElement(TypeUI, null))));
}
export function mountReactPropertyApp(resolveFunction, rejectFunction, node) {
    propertyRootElement = generateRoot();
    propertyRoot = createRoot(propertyRootElement);
    propertyRoot.render(React.createElement(React.StrictMode, null,
        React.createElement(AnnotationContextProvider, { value: { resolve: resolveFunction, reject: rejectFunction, node: node } },
            React.createElement(PropertyUI, null))));
}
export function mountDBPediaApp(resolveFunction, rejectFunction, content) {
    dbpediaRootElement = generateRoot();
    dbpediaRoot = createRoot(dbpediaRootElement);
    dbpediaRoot.render(React.createElement(React.StrictMode, null,
        React.createElement(DBPediaContextProvider, { value: { resolve: resolveFunction, reject: rejectFunction, content: content } },
            React.createElement(DBPediaUI, null))));
}
export function unmountReactTypeApp() {
    if (thingRootElement == undefined || thingRoot == undefined) {
        return;
    }
    thingRoot.unmount();
    thingRootElement.remove();
}
export function unmountReactPropertyApp() {
    if (propertyRootElement == undefined || propertyRoot == undefined) {
        return;
    }
    propertyRoot.unmount();
    propertyRootElement.remove();
}
export function unmountDBPediaApp() {
    if (dbpediaRootElement == undefined || dbpediaRoot == undefined) {
        return;
    }
    dbpediaRoot.unmount();
    dbpediaRootElement.remove();
}
//# sourceMappingURL=App.js.map