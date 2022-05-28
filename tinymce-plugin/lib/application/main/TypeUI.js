import { __assign } from "tslib";
import React, { useContext, useState, useEffect, useMemo, useRef } from 'react';
import { Modal, ModalContent } from '../components/Modal';
import { AnnotationContext } from './AnnotationContext';
import UserControls from './modules/UserControls';
import AnnotateType from './modules/AnnotateType';
import { SmallText } from '../components/Typography';
import SchemaTypes from '../../schema.types.json';
import Selector from './modules/Selector';
import autoAnimate from '@formkit/auto-animate';
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
    var _b = useState(node), nodeValue = _b[0], setNodeValue = _b[1];
    var schemaType = useMemo(function () { return findSchemaType(nodeValue.itemtype); }, [nodeValue.itemtype]);
    var _c = useState([]), childProperties = _c[0], setChildProperties = _c[1];
    var parent = useRef(null);
    useEffect(function () {
        parent.current && autoAnimate(parent.current);
    }, [parent]);
    var _d = useState(false), editMode = _d[0], setEditMode = _d[1];
    var _e = useState(), editSelection = _e[0], setEditSelection = _e[1];
    var _f = useState(false), isNodeEdited = _f[0], setIsNodeEdited = _f[1];
    var nodeContent = nodeValue.content;
    useEffect(function () {
        var children = [];
        nodeContent.querySelectorAll('span[itemprop]').forEach(function (elem) { return children.push(elem); });
        setChildProperties(children);
    }, []);
    function editAnnotation() {
        setEditMode(true);
    }
    function cancelEdit() {
        setEditMode(false);
    }
    function finishEditing() {
        setEditMode(false);
        if (!editSelection)
            return;
        if (editSelection.value === nodeValue.itemtype)
            return;
        setNodeValue(function (node) { return __assign(__assign({}, node), { itemscope: true, itemtype: editSelection.value }); });
        setIsNodeEdited(true);
    }
    function saveEdit() {
        resolve(nodeValue);
    }
    if (editMode) {
        return (React.createElement(React.Fragment, null,
            React.createElement("p", null,
                "Editing current type: ",
                nodeValue.itemscope ? nodeValue.itemtype : '-'),
            React.createElement(SmallText, null, nodeContent.innerText),
            React.createElement(Selector, { selection: editSelection, setSelection: setEditSelection, options: SchemaTypes, name: 'itemtype', description: 'Type description:' }),
            React.createElement(UserControls, { applyAction: finishEditing, applyText: 'Save', cancelAction: cancelEdit })));
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(SmallText, null,
            "Type: ",
            nodeValue.itemscope ? nodeValue.itemtype : '-'),
        React.createElement("p", null, nodeContent.innerText),
        React.createElement("p", null, schemaType.comment),
        (childProperties === null || childProperties === void 0 ? void 0 : childProperties.length) > 0 && (React.createElement(React.Fragment, null,
            React.createElement(SmallText, null, "Properties:"),
            childProperties.map(function (elem, index) { return (React.createElement("p", { key: index },
                React.createElement("a", { href: elem.getAttribute('itemprop'), target: "_blank" }, elem.getAttribute('itemprop')),
                ": ",
                elem.innerHTML)); }))),
        isNodeEdited ? (React.createElement(UserControls, { applyAction: saveEdit, applyText: 'Save', cancelAction: reject })) : (React.createElement(UserControls, { applyAction: editAnnotation, applyText: 'Edit', cancelAction: reject }))));
}
function NewAnnotation() {
    var node = useContext(AnnotationContext).node;
    return (React.createElement(React.Fragment, null,
        React.createElement(SmallText, null, "Annotating:"),
        React.createElement("p", null, node.content),
        React.createElement(AnnotateType, null)));
}
//# sourceMappingURL=TypeUI.js.map