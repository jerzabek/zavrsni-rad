import { __assign } from "tslib";
import { useEffect, useState } from 'react';
var DBPEDIA_SPOTLIGHT_API = 'https://api.dbpedia-spotlight.org/en/candidates?text=';
export default function useDBPedia() {
    var _a = useState(), annotationData = _a[0], setAnnotationData = _a[1];
    var _b = useState(''), error = _b[0], setError = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    function annotate(text) {
        setLoading(true);
        var url = DBPEDIA_SPOTLIGHT_API + encodeURIComponent(text);
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
            .catch(function (err) { return setError('Error occurred. ' + err); })
            .finally(function () { return setLoading(false); });
    }
    useEffect(function () {
        setLoading(false);
    }, [annotationData]);
    return { annotate: annotate, annotationData: annotationData, error: error, loading: loading };
}
//# sourceMappingURL=UseDBPedia.js.map