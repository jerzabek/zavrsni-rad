import { mountReactTypeApp, unmountReactTypeApp, mountReactPropertyApp, unmountReactPropertyApp } from '../../application/App';
var enabledThingView = false;
var enabledPropertyView = false;
function isScoped(node) {
    return node.hasAttribute('itemscope');
}
function isTyped(node) {
    return node.hasAttribute('itemtype');
}
function isProped(node) {
    return node.hasAttribute('itemprop');
}
function prepareNewNode(nodeInfo) {
    var node;
    if (typeof nodeInfo.content === 'object') {
        node = nodeInfo.content;
        console.log('old node', node);
    }
    else {
        node = document.createElement('span');
        console.log('new node', node);
    }
    if (nodeInfo.itemscope) {
        node.setAttribute('itemscope', 'true');
    }
    if (nodeInfo.itemtype) {
        node.setAttribute('itemtype', nodeInfo.itemtype);
    }
    if (nodeInfo.itemprop) {
        node.setAttribute('itemprop', nodeInfo.itemprop);
    }
    return node;
}
var setup = function (editor) {
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
    editor.ui.registry.addButton('zavrad_property', {
        text: 'Annotate property',
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
};
export default (function () {
    tinymce.PluginManager.add('zavrad', setup);
});
//# sourceMappingURL=Plugin.js.map