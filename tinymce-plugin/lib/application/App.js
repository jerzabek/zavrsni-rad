import React from 'react';
import { createRoot } from 'react-dom/client';
import UI from './components/UI';
var root = undefined;
export function setupReactApp(resolveFunction) {
    root = createRoot(document.getElementById('root'));
    root.render(React.createElement(React.StrictMode, null,
        React.createElement(UI, { resolve: resolveFunction })));
}
export function unmountReactApp() {
    if (typeof root === 'undefined') {
        return;
    }
    root.unmount();
}
//# sourceMappingURL=App.js.map