import { __makeTemplateObject } from "tslib";
import React, { useRef, useEffect } from 'react';
import Select from 'react-select';
import { SmallText } from '../../components/Typography';
import autoAnimate from '@formkit/auto-animate';
import styled from 'styled-components';
var SelectionContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: 2em 0;\n"], ["\n  margin: 2em 0;\n"])));
export default function Selector(_a) {
    var selection = _a.selection, setSelection = _a.setSelection, options = _a.options, name = _a.name, description = _a.description;
    var parent = useRef(null);
    useEffect(function () {
        parent.current && autoAnimate(parent.current);
    }, [parent]);
    return (React.createElement("div", { ref: parent },
        React.createElement(SelectionContainer, null,
            React.createElement(Select, { classNamePrefix: "select", name: name, onChange: function (selection) { return setSelection(selection); }, value: selection, options: options })),
        selection && (React.createElement(React.Fragment, null,
            React.createElement(SmallText, null, description),
            React.createElement("p", null, selection.comment)))));
}
var templateObject_1;
//# sourceMappingURL=Selector.js.map