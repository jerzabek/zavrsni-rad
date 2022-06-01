import { mountReactPropertyApp, unmountReactPropertyApp } from '../../application/App';
import { isScoped, isTyped, isProped, prepareNewNode } from './AnnotationUtility';
var enabledPropertyView = false;
export default function SetupDBPediaAnnotation(editor) {
    editor.ui.registry.addButton('zavrad_dbpedia', {
        text: 'DBPedia annotation',
        onAction: function () {
            var rng = editor.selection.getRng();
            if (rng.startContainer !== rng.endContainer) {
                // return;
            }
            enabledPropertyView = !enabledPropertyView;
            if (enabledPropertyView) {
                new Promise(function (resolve, reject) {
                    var selectedNode = editor.selection.getNode();
                    var selectedContent = editor.selection.getContent();
                    var nodeInfo = {};
                    if (!selectedContent) {
                        // User did not select anything - only placed his cursor inside a node
                        nodeInfo.content = selectedNode;
                        nodeInfo.itemscope = isScoped(selectedNode);
                        if (isProped(selectedNode)) {
                            nodeInfo.itemprop = selectedNode.getAttribute('itemprop');
                        }
                        if (isTyped(selectedNode)) {
                            nodeInfo.itemtype = selectedNode.getAttribute('itemtype');
                        }
                        if (!nodeInfo.itemprop) {
                            enabledPropertyView = false;
                            return;
                        }
                    }
                    else {
                        // User selected text - we will treat this as a new annotation
                        nodeInfo.content = selectedContent;
                    }
                    mountReactPropertyApp(resolve, reject, nodeInfo);
                }).then(function (result) {
                    var newNode = prepareNewNode(result);
                    if (typeof (result === null || result === void 0 ? void 0 : result.content) === 'string') {
                        newNode.innerHTML = editor.selection.getContent();
                        editor.selection.setNode(newNode);
                    }
                }).finally(function () {
                    unmountReactPropertyApp();
                    enabledPropertyView = false;
                });
            }
            else {
                unmountReactPropertyApp();
                enabledPropertyView = false;
            }
        }
    });
}
//# sourceMappingURL=SetupAnnotateDBPedia.js.map