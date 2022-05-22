import React, { useContext } from 'react';
import { Modal, ModalContent } from '../components/Modal';
import { AnnotationContext } from './AnnotationContext';
import UserControls from './modules/UserControls';
import AnnotateType from './modules/AnnotateType';
import { SmallText } from '../components/Typography';
import SchemaTypes from '../../schema.types.json';
import { useMemo } from 'react';
export default function UI() {
    var node = useContext(AnnotationContext).node;
    console.log(node);
    if (typeof node.content === 'object') {
        return (React.createElement(Modal, null,
            React.createElement(ModalContent, null,
                React.createElement("h3", null, "Annotating existing element"),
                React.createElement(ExistingAnnotation, null))));
    }
    return (React.createElement(Modal, null,
        React.createElement(ModalContent, null,
            React.createElement("h3", null, "Annotating new element"),
            React.createElement(NewAnnotation, null))));
}
function findSchemaType(id) {
    return SchemaTypes.find(function (_a) {
        var value = _a.value;
        return value === id;
    });
}
function ExistingAnnotation() {
    var _a = useContext(AnnotationContext), node = _a.node, resolve = _a.resolve, reject = _a.reject;
    var schemaType = useMemo(function () { return findSchemaType(node.itemtype); }, [node.itemtype]);
    var nodeContent = node.content;
    // nodeContent.querySelectorAll()
    function applyAnnotation() {
        resolve(node);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(SmallText, null, node.itemscope ? node.itemtype : node.itemprop),
        React.createElement("p", null, nodeContent.innerText),
        React.createElement("p", null, schemaType.comment),
        React.createElement(UserControls, { applyAction: applyAnnotation, applyText: 'Save', cancelAction: reject })));
}
function NewAnnotation() {
    var node = useContext(AnnotationContext).node;
    return (React.createElement(React.Fragment, null,
        React.createElement(SmallText, null, "Annotating:"),
        React.createElement("p", null, node.content),
        React.createElement(AnnotateType, null)));
}
//# sourceMappingURL=UI.js.map