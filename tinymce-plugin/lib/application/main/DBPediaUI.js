import { __assign, __makeTemplateObject } from "tslib";
import React, { useContext, useEffect, useState } from 'react';
import { Modal, ModalContent } from '../components/Modal';
import { SmallText } from '../components/Typography';
import { DBPediaContext } from './DBPediaContext';
import UserControls from './modules/UserControls';
import AnnotatedText from './modules/AnnotatedText';
import styled from 'styled-components';
var DBPEDIA_SPOTLIGHT_API = 'https://api.dbpedia-spotlight.org/en/candidates?text=';
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-bottom: 20px;\n"], ["\n  margin-bottom: 20px;\n"])));
export default function DBPediaUI() {
    var _a = useContext(DBPediaContext), content = _a.content, resolve = _a.resolve, reject = _a.reject;
    var _b = useState(), annotationData = _b[0], setAnnotationData = _b[1];
    var _c = useState(''), error = _c[0], setError = _c[1];
    var _d = useState(false), loading = _d[0], setLoading = _d[1];
    function annotate() {
        setLoading(true);
        var url = DBPEDIA_SPOTLIGHT_API + encodeURIComponent(content);
        var headers = {
            'accept': 'application/json'
        };
        fetch(url, { headers: headers })
            .then(function (response) { return response.json(); })
            .then(function (response) {
            if (!('surfaceForm' in response.annotation)) {
                // If no annotatios were found we just set up empty array
                return { annotation: __assign(__assign({}, response.annotation), { surfaceForm: [] }) };
            }
            if (!Array.isArray(response.annotation.surfaceForm)) {
                // If the surfaceFrom property only contains one value it will be just the object, so we wrap it in an array
                response.annotation.surfaceForm = [response.annotation.surfaceForm];
            }
            return response;
        })
            .then(function (response) {
            // Some annotations do not specify any types and therefor are useless
            response.annotation.surfaceForm = response.annotation.surfaceForm.filter(function (annotation) { return !!annotation.resource['@types']; });
            return response;
        })
            .then(function (_a) {
            var annotation = _a.annotation;
            return setAnnotationData(annotation);
        })
            .catch(function (err) { return setError('Error occurred. ' + err); });
    }
    function saveAnnotations() {
        // Perfect solution would be to use ReactDOMServer.renderToStaticMarkup() method but rollup simply does not care and breaks upon importing said method & library
        resolve(annotationData);
    }
    useEffect(function () {
        setLoading(false);
    }, [annotationData]);
    return (React.createElement(Modal, null,
        React.createElement(ModalContent, null,
            React.createElement("h3", null, "Annotate using DBPedia"),
            React.createElement(SmallText, null, "Using DBPedia Spotlight API you can automatically detect possible annotations in the text you selected."),
            React.createElement(Container, null,
                annotationData ? (React.createElement(AnnotatedText, { annotationDetails: annotationData })) : (React.createElement("p", null, content)),
                error && (React.createElement(React.Fragment, null,
                    React.createElement(SmallText, null, "Error:"),
                    React.createElement("p", null, error)))),
            annotationData ? (React.createElement(UserControls, { applyAction: saveAnnotations, applyText: 'Save', cancelAction: reject })) : (React.createElement(UserControls, { applyAction: annotate, applyDisabled: loading, applyText: 'Annotate', cancelAction: reject })))));
}
var templateObject_1;
//# sourceMappingURL=DBPediaUI.js.map