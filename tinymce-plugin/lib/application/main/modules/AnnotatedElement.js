import { __makeTemplateObject } from "tslib";
import React, { useState } from 'react';
import styled from 'styled-components';
var AnnotatedItem = styled.span(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: #ff000010;\n  border: 1px solid #00000020;\n  position: relative;\n"], ["\n  background-color: #ff000010;\n  border: 1px solid #00000020;\n  position: relative;\n"])));
var HoverBubble = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;\n  position: absolute;\n  padding: 15px;\n  background-color: #fff;\n  color: #000;\n  z-index: 10001;\n"], ["\n  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;\n  position: absolute;\n  padding: 15px;\n  background-color: #fff;\n  color: #000;\n  z-index: 10001;\n"])));
export default function AnnotatedElement(_a) {
    var itemtype = _a.itemtype, label = _a.label;
    var _b = useState(false), hover = _b[0], setHover = _b[1];
    // The itemtype attribute may, according to specification, contain multiple unordered values spearated by a space
    // The values of this attribute must be valid URLs that are defined to use the same vocabulary - in our case only schema.org
    // https://html.spec.whatwg.org/multipage/microdata.html#attr-itemtype
    var itemType = itemtype.split(", ").filter(function (type) { return type.startsWith("Schema:"); }).map(function (type) { return type.replace("Schema:", "https://schema.org/"); }).join(' ');
    function enableHover() {
        setHover(true);
    }
    function disableHover() {
        setHover(false);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(AnnotatedItem, { onMouseEnter: enableHover, onMouseLeave: disableHover, itemScope: true, itemType: itemType },
            label,
            hover && (React.createElement(HoverBubble, null, itemtype)))));
}
var templateObject_1, templateObject_2;
//# sourceMappingURL=AnnotatedElement.js.map