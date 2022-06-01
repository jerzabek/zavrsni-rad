import { __assign } from "tslib";
import React, { useContext, useState, useEffect, useRef, useMemo } from 'react';
import { Modal, ModalContent } from '../components/Modal';
import { AnnotationContext } from './AnnotationContext';
import UserControls from './modules/UserControls';
import AnnotateProperty from './modules/AnnotateProperty';
import { SmallText } from '../components/Typography';
import SchemaTypes from '../../schema.props.json';
import autoAnimate from '@formkit/auto-animate';
import Selector from './modules/Selector';
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
    var _b = useState(node), nodeValue = _b[0], setNodeValue = _b[1];
    var schemaType = useMemo(function () { return findSchemaType(nodeValue.itemprop); }, [nodeValue.itemprop]);
    var parent = useRef(null);
    useEffect(function () {
        parent.current && autoAnimate(parent.current);
    }, [parent]);
    var _c = useState(false), editMode = _c[0], setEditMode = _c[1];
    var _d = useState(), editSelection = _d[0], setEditSelection = _d[1];
    var _e = useState(false), isNodeEdited = _e[0], setIsNodeEdited = _e[1];
    var nodeContent = nodeValue.content;
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
        if (editSelection.value === nodeValue.itemprop)
            return;
        setNodeValue(function (node) { return __assign(__assign({}, node), { itemprop: editSelection.value }); });
        setIsNodeEdited(true);
    }
    function saveEdit() {
        resolve(nodeValue);
    }
    if (editMode) {
        return (React.createElement(React.Fragment, null,
            React.createElement("p", null,
                "Editing current type: ",
                nodeValue.itemprop),
            React.createElement(SmallText, null, nodeContent.innerText),
            React.createElement(Selector, { selection: editSelection, setSelection: setEditSelection, options: SchemaTypes, name: 'itemprop', description: 'Property description:' }),
            React.createElement(UserControls, { applyAction: finishEditing, applyText: 'Save', cancelAction: cancelEdit })));
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(SmallText, null,
            "Property: ",
            nodeValue.itemprop,
            " ",
            nodeValue.itemscope ? React.createElement("i", null,
                "(also ",
                nodeValue.itemtype,
                ")") : ''),
        React.createElement("p", null, nodeContent.innerText),
        React.createElement("p", null, schemaType && schemaType.comment),
        isNodeEdited ? (React.createElement(UserControls, { applyAction: saveEdit, applyText: 'Save', cancelAction: reject })) : (React.createElement(UserControls, { applyAction: editAnnotation, applyText: 'Edit', cancelAction: reject }))));
}
function NewAnnotation() {
    var node = useContext(AnnotationContext).node;
    return (React.createElement(React.Fragment, null,
        React.createElement(SmallText, null, "Annotating:"),
        React.createElement("p", null, node.content),
        React.createElement(AnnotateProperty, null)));
}
//# sourceMappingURL=PropertyUI.js.map