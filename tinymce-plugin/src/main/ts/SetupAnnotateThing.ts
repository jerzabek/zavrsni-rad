import { Editor } from 'tinymce';
import { mountReactTypeApp, unmountReactTypeApp } from '../../application/App'
import { ResolveFunctionType, RichNode } from '../../model/RichNode'
import { isScoped, isTyped, isProped, prepareNewNode } from './AnnotationUtility'

let enabledThingView = false;

export default function SetupAnnotateThing(editor: Editor): void {
  editor.ui.registry.addButton('zavrad_thing', {
    text: 'Annotate thing',
    onAction: () => {
      enabledThingView = !enabledThingView;

      if (enabledThingView) {
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
}