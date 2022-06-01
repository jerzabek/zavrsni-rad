import { mountReactTypeApp, unmountReactTypeApp } from '../../application/App';
import { isScoped, isTyped, isProped, prepareNewNode } from './AnnotationUtility';
var enabledThingView = false;
export default function SetupAnnotateThing(editor) {
    editor.ui.registry.addButton('zavrad_thing', {
        text: 'Annotate thing',
        onAction: function () {
            var rng = editor.selection.getRng();
            if (rng.startContainer !== rng.endContainer) {
                // return;
            }
            enabledThingView = !enabledThingView;
            if (enabledThingView) {
                new Promise(function (resolve, reject) {
                    var selectedNode = editor.selection.getNode();
                    var selectedContent = editor.selection.getSel().toString();
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
                        if (!nodeInfo.itemscope && !nodeInfo.itemtype) {
                            enabledThingView = false;
                            return;
                        }
                    }
                    else {
                        // User selected text - we will treat this as a new annotation
                        nodeInfo.content = selectedContent;
                    }
                    mountReactTypeApp(resolve, reject, nodeInfo);
                }).then(function (result) {
                    var newNode = prepareNewNode(result);
                    if (typeof (result === null || result === void 0 ? void 0 : result.content) === 'string') {
                        newNode.innerHTML = editor.selection.getContent();
                        editor.selection.setNode(newNode);
                    }
                }).finally(function () {
                    unmountReactTypeApp();
                    enabledThingView = false;
                });
            }
            else {
                unmountReactTypeApp();
                enabledThingView = false;
            }
        }
    });
}
//# sourceMappingURL=SetupAnnotateThing.js.map