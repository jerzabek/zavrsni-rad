import { __assign, __makeTemplateObject } from "tslib";
import React, { useContext, useState, useRef, useEffect } from 'react';
import { AnnotationContext } from '../AnnotationContext';
import UserControls from './UserControls';
import styled from 'styled-components';
import Select from 'react-select';
import SchemaTypes from '../../../schema.props.json';
import { SmallText } from '../../components/Typography';
import autoAnimate from '@formkit/auto-animate';
var SelectionContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: 2em 0;\n"], ["\n  margin: 2em 0;\n"])));
export default function AnnotateProperty() {
    var _a = useContext(AnnotationContext), node = _a.node, resolve = _a.resolve, reject = _a.reject;
    var _b = useState(), selection = _b[0], setSelection = _b[1];
    var parent = useRef(null);
    useEffect(function () {
        parent.current && autoAnimate(parent.current);
    }, [parent]);
    function applyAnnotation() {
        var resultNode = __assign(__assign({}, node), { itemprop: selection.value });
        resolve(resultNode);
    }
    return (React.createElement("div", { ref: parent },
        React.createElement(SelectionContainer, null,
            React.createElement(Select, { classNamePrefix: "select", name: "itemprop", onChange: function (selection) { return setSelection(selection); }, value: selection, options: SchemaTypes })),
        selection && (React.createElement(React.Fragment, null,
            React.createElement(SmallText, null, "Property description:"),
            React.createElement("p", null, selection.comment))),
        React.createElement(UserControls, { applyAction: applyAnnotation, cancelAction: reject })));
}
var templateObject_1;
//# sourceMappingURL=AnnotateProperty.js.map