import { RichNode } from '../../model/RichNode'

export function isScoped(node: Element): boolean {
  return node.hasAttribute('itemscope')
}

export function isTyped(node: Element): boolean {
  return node.hasAttribute('itemtype')
}

export function isProped(node: Element): boolean {
  return node.hasAttribute('itemprop')
}

export function prepareNewNode(nodeInfo: RichNode): Element {
  let node

  if (typeof nodeInfo.content === 'object') {
    node = nodeInfo.content
    console.log('old node', node)
  } else {
    node = document.createElement('span')
    console.log('new node', node)
  }

  if (nodeInfo.itemscope) {
    node.setAttribute('itemscope', 'true')
  }

  if (nodeInfo.itemtype) {
    node.setAttribute('itemtype', nodeInfo.itemtype)
  }

  if (nodeInfo.itemprop) {
    node.setAttribute('itemprop', nodeInfo.itemprop)
  }

  return node;
}
