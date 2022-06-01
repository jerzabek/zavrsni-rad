import { Editor } from 'tinymce';
import { mountReactPropertyApp, unmountReactPropertyApp } from '../../application/App'
import { ResolveFunctionType, RichNode } from '../../model/RichNode'
import { isScoped, isTyped, isProped, prepareNewNode } from './AnnotationUtility'

let enabledPropertyView = false;

export default function SetupAnnotateProperty(editor: Editor): void {
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
          const selectedContent = editor.selection.getSel().toString()

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
}