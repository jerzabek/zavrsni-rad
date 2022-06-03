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
    }
    else {
        node = document.createElement('span');
    }
    if (nodeInfo.itemscope) {
        node.setAttribute('itemscope', 'true');
    }
    else {
        node.removeAttribute('itemscope');
    }
    if (nodeInfo.itemtype) {
        node.setAttribute('itemtype', nodeInfo.itemtype);
    }
    else {
        node.removeAttribute('itemtype');
    }
    if (nodeInfo.itemprop) {
        node.setAttribute('itemprop', nodeInfo.itemprop);
    }
    else {
        node.removeAttribute('itemprop');
    }
    return node;
}
//# sourceMappingURL=AnnotationUtility.js.map