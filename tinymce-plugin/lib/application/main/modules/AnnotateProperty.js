import { __assign } from "tslib";
import React, { useContext, useState } from 'react';
import { AnnotationContext } from '../AnnotationContext';
import UserControls from './UserControls';
import SchemaTypes from '../../../schema.props.json';
import Selector from './Selector';
export default function AnnotateProperty() {
    var _a = useContext(AnnotationContext), node = _a.node, resolve = _a.resolve, reject = _a.reject;
    var _b = useState(), selection = _b[0], setSelection = _b[1];
    function applyAnnotation() {
        if (!selection)
            return;
        var resultNode = __assign(__assign({}, node), { itemprop: selection.value });
        resolve(resultNode);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(Selector, { selection: selection, setSelection: setSelection, options: SchemaTypes, name: 'itemprop', description: 'Property description:' }),
        React.createElement(UserControls, { applyDisabled: !selection, applyAction: applyAnnotation, cancelAction: reject })));
}
//# sourceMappingURL=AnnotateProperty.js.map