import { __assign, __makeTemplateObject } from "tslib";
import React, { useContext, useEffect, useState } from 'react';
import { AnnotationContext } from '../AnnotationContext';
import UserControls from './UserControls';
import SchemaTypes from '../../../schema.types.json';
import Selector from './Selector';
import { SmallText } from '../../../application/components/Typography';
import styled from 'styled-components';
import useDBPedia from './UseDBPedia';
var PillContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  font-size: 0.8rem;\n  margin-top: 5px;\n"], ["\n  display: flex;\n  font-size: 0.8rem;\n  margin-top: 5px;\n"])));
var Pill = styled.span(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 0.1em 0.8em;\n  border-radius: 30px;\n  background-color: rgb(0, 112, 243);\n  border: none;\n  color: white;\n  margin-right: 10px;\n\n  &:hover {\n    cursor:pointer;\n  }\n"], ["\n  padding: 0.1em 0.8em;\n  border-radius: 30px;\n  background-color: rgb(0, 112, 243);\n  border: none;\n  color: white;\n  margin-right: 10px;\n\n  &:hover {\n    cursor:pointer;\n  }\n"])));
export function findSchemaType(id) {
    return SchemaTypes.find(function (_a) {
        var value = _a.value;
        return value === id;
    });
}
export default function AnnotateType() {
    var _a = useContext(AnnotationContext), node = _a.node, resolve = _a.resolve, reject = _a.reject;
    var _b = useState(), selection = _b[0], setSelection = _b[1];
    var _c = useDBPedia(), annotate = _c.annotate, annotationData = _c.annotationData, error = _c.error, loading = _c.loading;
    var _d = useState(), recommendations = _d[0], setRecommendations = _d[1];
    function applyAnnotation() {
        if (!selection)
            return;
        var resultNode = __assign(__assign({}, node), { itemscope: true, itemtype: selection.value });
        resolve(resultNode);
    }
    useEffect(function () {
        if (!node.content) {
            return;
        }
        annotate(node.content);
    }, []);
    useEffect(function () {
        if (!annotationData) {
            return;
        }
        if (!annotationData.surfaceForm) {
            return;
        }
        var recommendations = {};
        annotationData.surfaceForm.forEach(function (annotation) {
            var types = annotation.resource['@types'].split(", ");
            for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
                var type = types_1[_i];
                if (type in recommendations) {
                    continue;
                }
                // We only work with Schema.org, we filter out everything else
                if (!type.startsWith("Schema:")) {
                    continue;
                }
                // original type is e.g. "Schema:Person"
                var schemaName = type.split(":")[1];
                schemaName = "https://schema.org/" + schemaName;
                var schemaType = findSchemaType(schemaName);
                if (!schemaType) {
                    // If this is an unidentified schema type we ignore it
                    continue;
                }
                recommendations[type] = schemaType;
            }
        });
        if (Object.keys(recommendations).length === 0) {
            // Nothing found
            return;
        }
        setRecommendations(recommendations);
    }, [annotationData]);
    return (React.createElement(React.Fragment, null,
        loading ? (React.createElement(SmallText, null, "Loading recommendations...")) : (error ? (React.createElement(SmallText, null, "No recommendations available. Please choose by yourself")) : (recommendations ? (React.createElement(React.Fragment, null,
            React.createElement(SmallText, null, "Recommendations:"),
            React.createElement(PillContainer, null, Object.values(recommendations).map(function (annotation) { return (React.createElement(Pill, { onClick: function () { return setSelection(annotation); } }, annotation.label)); })))) : (React.createElement(SmallText, null, "No recommendations available. Please choose by yourself")))),
        React.createElement(Selector, { selection: selection, setSelection: setSelection, options: SchemaTypes, name: 'itemtype', description: 'Type description:' }),
        React.createElement(UserControls, { applyDisabled: !selection, applyAction: applyAnnotation, cancelAction: reject })));
}
var templateObject_1, templateObject_2;
//# sourceMappingURL=AnnotateType.js.map