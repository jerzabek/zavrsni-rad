import { __makeTemplateObject } from "tslib";
import React, { useContext } from 'react';
import { Modal, ModalContent } from '../components/Modal';
import { SmallText } from '../components/Typography';
import { DBPediaContext } from './DBPediaContext';
import UserControls from './modules/UserControls';
import AnnotatedText from './modules/AnnotatedText';
import styled from 'styled-components';
import useDBPedia from './modules/UseDBPedia';
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-bottom: 20px;\n"], ["\n  margin-bottom: 20px;\n"])));
export default function DBPediaUI() {
    var _a = useContext(DBPediaContext), content = _a.content, resolve = _a.resolve, reject = _a.reject;
    var _b = useDBPedia(), annotate = _b.annotate, annotationData = _b.annotationData, error = _b.error, loading = _b.loading;
    function saveAnnotations() {
        // Perfect solution would be to use ReactDOMServer.renderToStaticMarkup() method but rollup simply does not care and breaks upon importing said method & library
        resolve(annotationData);
    }
    return (React.createElement(Modal, null,
        React.createElement(ModalContent, null,
            React.createElement("h3", null, "Annotate using DBPedia"),
            React.createElement(SmallText, null, "Using DBPedia Spotlight API you can automatically detect possible annotations in the text you selected."),
            React.createElement(Container, null,
                annotationData ? (React.createElement(AnnotatedText, { annotationDetails: annotationData })) : (React.createElement("p", null, content)),
                error && (React.createElement(React.Fragment, null,
                    React.createElement(SmallText, null, "Error:"),
                    React.createElement("p", null, error)))),
            annotationData ? (React.createElement(UserControls, { applyAction: saveAnnotations, applyText: 'Save', cancelAction: reject })) : (React.createElement(UserControls, { applyAction: function () { return annotate(content); }, applyDisabled: loading, applyText: 'Annotate', cancelAction: reject })))));
}
var templateObject_1;
//# sourceMappingURL=DBPediaUI.js.map