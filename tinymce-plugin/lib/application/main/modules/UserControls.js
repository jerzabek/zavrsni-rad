import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import { Button, OutlineButton } from '../../components/Button';
var OutlineButtonMargin = styled(OutlineButton)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nmargin-right: 1rem;\n"], ["\nmargin-right: 1rem;\n"])));
var ButtonContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\ntext-align: end;\n"], ["\ntext-align: end;\n"])));
export default function UserControls(_a) {
    var cancelAction = _a.cancelAction, applyAction = _a.applyAction, _b = _a.applyText, applyText = _b === void 0 ? 'Annotate' : _b, applyDisabled = _a.applyDisabled;
    return (React.createElement(ButtonContainer, null,
        React.createElement(OutlineButtonMargin, { onClick: cancelAction }, "Cancel"),
        React.createElement(Button, { disabled: applyDisabled, onClick: applyAction }, applyText)));
}
var templateObject_1, templateObject_2;
//# sourceMappingURL=UserControls.js.map