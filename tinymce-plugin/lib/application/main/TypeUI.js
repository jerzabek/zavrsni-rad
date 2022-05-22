import React, { useContext, useState, useEffect, useMemo } from 'react';
import { Modal, ModalContent } from '../components/Modal';
import { AnnotationContext } from './AnnotationContext';
import UserControls from './modules/UserControls';
import AnnotateType from './modules/AnnotateType';
import { SmallText } from '../components/Typography';
import SchemaTypes from '../../schema.types.json';
export default function TypeUI() {
    var node = useContext(AnnotationContext).node;
    if (typeof node.content === 'object') {
        return (React.createElement(Modal, null,
            React.createElement(ModalContent, null,
                React.createElement("h3", null, "Existing thing annotation"),
                React.createElement(ExistingAnnotation, null))));
    }
    return (React.createElement(Modal, null,
        React.createElement(ModalContent, null,
            React.createElement("h3", null, "Annotating new thing"),
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
    var _b = useState([]), children = _b[0], setChildren = _b[1];
    var nodeContent = node.content;
    useEffect(function () {
        var children = [];
        nodeContent.querySelectorAll('span[itemprop]').forEach(function (elem) { return children.push(elem); });
        setChildren(children);
    }, []);
    function applyAnnotation() {
        resolve(node);
    }
    return (React.createElement("div", null,
        React.createElement(SmallText, null,
            "Type: ",
            node.itemscope ? node.itemtype : '-'),
        React.createElement("p", null, nodeContent.innerText),
        React.createElement("p", null, schemaType.comment),
        (children === null || children === void 0 ? void 0 : children.length) > 0 && (React.createElement(React.Fragment, null,
            React.createElement(SmallText, null, "Properties:"),
            children.map(function (elem, index) { return (React.createElement("p", { key: index },
                React.createElement("a", { href: elem.getAttribute('itemprop'), target: "_blank" }, elem.getAttribute('itemprop')),
                ": ",
                elem.innerHTML)); }))),
        React.createElement(UserControls, { applyAction: applyAnnotation, applyText: 'Save', cancelAction: reject })));
}
function NewAnnotation() {
    var node = useContext(AnnotationContext).node;
    return (React.createElement(React.Fragment, null,
        React.createElement(SmallText, null, "Annotating:"),
        React.createElement("p", null, node.content),
        React.createElement(AnnotateType, null)));
}
//# sourceMappingURL=TypeUI.js.map