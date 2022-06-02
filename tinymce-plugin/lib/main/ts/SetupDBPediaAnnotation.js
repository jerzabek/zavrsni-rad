import { mountDBPediaApp, unmountDBPediaApp } from '../../application/App';
var enabledPropertyView = false;
export default function SetupDBPediaAnnotation(editor) {
    editor.ui.registry.addButton('zavrad_dbpedia', {
        text: 'DBPedia annotation',
        onAction: function () {
            enabledPropertyView = !enabledPropertyView;
            if (enabledPropertyView) {
                new Promise(function (resolve, reject) {
                    var selectedContent = editor.selection.getSel().toString();
                    if (!selectedContent) {
                        // User did not select anything - only placed his cursor inside a node
                        reject();
                        return;
                    }
                    mountDBPediaApp(resolve, reject, selectedContent);
                }).then(function (annotationDetails) {
                    var elements = document.createElement('pre');
                    var content = annotationDetails['@text'];
                    var beginingOffset = 0;
                    annotationDetails.surfaceForm.sort(function (a, b) { return a['@offset'] - b['@offset']; }).forEach(function (annotation) {
                        if (annotation['@offset'] < beginingOffset) {
                            // There is a nested annotation - e.g. <span>Holy Roman Emperor <span>Leopold I</span></span>
                            // Ignore this case
                            return;
                        }
                        var text = content.substring(0, annotation['@offset'] - beginingOffset);
                        var textNode = document.createTextNode(text);
                        beginingOffset = beginingOffset + text.length + annotation['@name'].length;
                        content = content.replace(text, '').replace(annotation['@name'], '');
                        var currentAnnotatedElement = document.createElement('span');
                        currentAnnotatedElement.innerHTML = annotation['@name'];
                        currentAnnotatedElement.setAttribute('itemscope', 'true');
                        currentAnnotatedElement.setAttribute('itemtype', annotation.resource['@types'].split(", ").filter(function (type) { return type.startsWith("Schema:"); }).map(function (type) { return type.replace("Schema:", "https://schema.org/"); }).join(' '));
                        elements.appendChild(textNode);
                        elements.appendChild(currentAnnotatedElement);
                    });
                    elements.appendChild(document.createTextNode(content));
                    var result = elements.innerHTML;
                    result = result.replaceAll('\n', '<br>');
                    editor.selection.setContent(result);
                }).finally(function () {
                    unmountDBPediaApp();
                    enabledPropertyView = false;
                });
            }
            else {
                unmountDBPediaApp();
                enabledPropertyView = false;
            }
        }
    });
}
//# sourceMappingURL=SetupDBPediaAnnotation.js.map