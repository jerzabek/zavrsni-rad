import { Editor, TinyMCE } from 'tinymce';
import { mountReactTypeApp, unmountReactTypeApp, mountReactPropertyApp, unmountReactPropertyApp } from '../../application/App'
import { ResolveFunctionType, RichNode } from '../../model/RichNode'

declare const tinymce: TinyMCE;
let enabledThingView = false;
let enabledPropertyView = false;

function isScoped(node: Element): boolean {
  return node.hasAttribute('itemscope')
}

function isTyped(node: Element): boolean {
  return node.hasAttribute('itemtype')
}

function isProped(node: Element): boolean {
  return node.hasAttribute('itemprop')
}

function prepareNewNode(nodeInfo: RichNode): Element {
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

const setup = (editor: Editor): void => {
  editor.ui.registry.addButton('zavrad_thing', {
    text: 'Annotate thing',
    onAction: () => {
      const rng = editor.selection.getRng()
      if (rng.startContainer !== rng.endContainer) {
        // return;
      }

      enabledThingView = !enabledThingView;

      if (enabledThingView) {
        new Promise((resolve: ResolveFunctionType, reject) => {
          const selectedNode = editor.selection.getNode()
          const selectedContent = editor.selection.getContent()

          const nodeInfo: RichNode = {}

          if (!selectedContent) {
            // User did not select anything - only placed his cursor inside a node

            nodeInfo.content = selectedNode
            nodeInfo.itemscope = isScoped(selectedNode)

            if (isProped(selectedNode)) {
              nodeInfo.itemprop = selectedNode.getAttribute('itemprop')
            }

            if (isTyped(selectedNode)) {
              nodeInfo.itemtype = selectedNode.getAttribute('itemtype')
            }

            if (!nodeInfo.itemscope && !nodeInfo.itemtype) {
              enabledThingView = false
              return
            }
          } else {
            // User selected text - we will treat this as a new annotation
            nodeInfo.content = selectedContent
          }

          mountReactTypeApp(resolve, reject, nodeInfo)
        }).then((result: RichNode) => {
          const newNode = prepareNewNode(result)

          if (typeof result?.content === 'string') {
            newNode.innerHTML = editor.selection.getContent()
            editor.selection.setNode(newNode);
          }
        }).finally(() => {
          unmountReactTypeApp()
          enabledThingView = false;
        })
      } else {
        unmountReactTypeApp()
        enabledThingView = false;
      }
    }
  });

  editor.ui.registry.addButton('zavrad_property', {
    text: 'Annotate property',
    onAction: () => {
      const rng = editor.selection.getRng()
      if (rng.startContainer !== rng.endContainer) {
        // return;
      }

      enabledPropertyView = !enabledPropertyView;

      if (enabledPropertyView) {
        new Promise((resolve: ResolveFunctionType, reject) => {
          const selectedNode = editor.selection.getNode()
          const selectedContent = editor.selection.getContent()

          const nodeInfo: RichNode = {}

          if (!selectedContent) {
            // User did not select anything - only placed his cursor inside a node

            nodeInfo.content = selectedNode
            nodeInfo.itemscope = isScoped(selectedNode)

            if (isProped(selectedNode)) {
              nodeInfo.itemprop = selectedNode.getAttribute('itemprop')
            }

            if (isTyped(selectedNode)) {
              nodeInfo.itemtype = selectedNode.getAttribute('itemtype')
            }

            if (!nodeInfo.itemprop) {
              enabledPropertyView = false
              return
            }
          } else {
            // User selected text - we will treat this as a new annotation
            nodeInfo.content = selectedContent
          }

          mountReactPropertyApp(resolve, reject, nodeInfo)
        }).then((result: RichNode) => {
          const newNode = prepareNewNode(result)

          if (typeof result?.content === 'string') {
            newNode.innerHTML = editor.selection.getContent()
            editor.selection.setNode(newNode);
          }
        }).finally(() => {
          unmountReactPropertyApp()
          enabledPropertyView = false;
        })
      } else {
        unmountReactPropertyApp()
        enabledPropertyView = false;
      }
    }
  });
};

export default (): void => {
  tinymce.PluginManager.add('zavrad', setup);
};
