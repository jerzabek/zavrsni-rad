import React, { useContext, useMemo } from 'react';
import { Modal, ModalContent } from '../components/Modal';
import { AnnotationContext } from './AnnotationContext';
import UserControls from './modules/UserControls';
import AnnotateProperty from './modules/AnnotateProperty';
import { SmallText } from '../components/Typography';
import SchemaTypes from '../../schema.props.json';
export default function PropertyUI() {
    var node = useContext(AnnotationContext).node;
    if (typeof node.content === 'object') {
        return (React.createElement(Modal, null,
            React.createElement(ModalContent, null,
                React.createElement("h3", null, "Existing property annotation"),
                React.createElement(ExistingAnnotation, null))));
    }
    return (React.createElement(Modal, null,
        React.createElement(ModalContent, null,
            React.createElement("h3", null, "Annotating new property"),
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
    var schemaType = useMemo(function () { return findSchemaType(node.itemprop); }, [node.itemprop]);
    var nodeContent = node.content;
    function applyAnnotation() {
        resolve(node);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(SmallText, null,
            "Property: ",
            node.itemprop,
            " ",
            node.itemscope ? React.createElement("i", null,
                "(also ",
                node.itemtype,
                ")") : ''),
        React.createElement("p", null, nodeContent.innerText),
        React.createElement("p", null, schemaType.comment),
        React.createElement(UserControls, { applyAction: applyAnnotation, applyText: 'Save', cancelAction: reject })));
}
function NewAnnotation() {
    var node = useContext(AnnotationContext).node;
    return (React.createElement(React.Fragment, null,
        React.createElement(SmallText, null, "Annotating:"),
        React.createElement("p", null, node.content),
        React.createElement(AnnotateProperty, null)));
}
//# sourceMappingURL=PropertyUI.js.map