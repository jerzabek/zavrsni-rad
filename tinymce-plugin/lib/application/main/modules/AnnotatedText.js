import { __spreadArray } from "tslib";
import React, { useEffect, useState } from 'react';
import AnnotatedElement from './AnnotatedElement';
export default function AnnotatedText(_a) {
    var annotationDetails = _a.annotationDetails;
    var _b = useState([]), content = _b[0], setContent = _b[1];
    useEffect(function () {
        var elements = [];
        var content = annotationDetails['@text'];
        var beginingOffset = 0;
        annotationDetails.surfaceForm.sort(function (a, b) { return a['@offset'] - b['@offset']; }).forEach(function (annotation, index) {
            if (annotation['@offset'] < beginingOffset) {
                // There is a nested annotation - e.g. <span>Holy Roman Emperor <span>Leopold I</span></span>
                // Ignore this case
                return;
            }
            var text = content.substring(0, annotation['@offset'] - beginingOffset);
            beginingOffset = beginingOffset + text.length + annotation['@name'].length;
            content = content.replace(text, '').replace(annotation['@name'], '');
            var currentAnnotatedElement = (React.createElement(AnnotatedElement, { key: index, itemtype: annotation.resource['@types'], label: annotation['@name'] }));
            elements = __spreadArray(__spreadArray([], elements, true), [text, currentAnnotatedElement], false);
        });
        setContent(__spreadArray(__spreadArray([], elements, true), [content], false));
    }, [annotationDetails]);
    function renderElements() {
        return content.map(function (annotatedElement, index) { return React.createElement(React.Fragment, { key: index }, annotatedElement); });
    }
    return (React.createElement(React.Fragment, null, renderElements()));
}
//# sourceMappingURL=AnnotatedText.js.map