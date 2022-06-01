export function isScoped(node) {
    return node.hasAttribute('itemscope');
}
export function isTyped(node) {
    return node.hasAttribute('itemtype');
}
export function isProped(node) {
    return node.hasAttribute('itemprop');
}
export function prepareNewNode(nodeInfo) {
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
//# sourceMappingURL=AnnotationUtility.js.map