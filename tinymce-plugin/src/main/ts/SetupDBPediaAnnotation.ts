import { DBPediaAnnotation, AnnotationInstance } from 'src/application/main/modules/AnnotatedText';
import { Editor } from 'tinymce';
import { mountDBPediaApp, unmountDBPediaApp } from '../../application/App'

let enabledPropertyView = false;

export default function SetupDBPediaAnnotation(editor: Editor): void {
  editor.ui.registry.addButton('zavrad_dbpedia', {
    text: 'DBPedia annotation',
    onAction: () => {
      enabledPropertyView = !enabledPropertyView;

      if (enabledPropertyView) {
        new Promise((resolve: (annotated: DBPediaAnnotation) => void, reject) => {
          const selectedContent = editor.selection.getSel().toString()

          if (!selectedContent) {
            // User did not select anything - only placed his cursor inside a node
            reject()
            return
          }

          mountDBPediaApp(resolve, reject, selectedContent)
        }).then((annotationDetails: DBPediaAnnotation) => {
          const elements = document.createElement('pre')
          let content = annotationDetails['@text']
          let beginingOffset = 0;


          annotationDetails.surfaceForm.sort((a, b) => a['@offset'] - b['@offset']).forEach((annotation: AnnotationInstance) => {
            if (annotation['@offset'] < beginingOffset) {
              // There is a nested annotation - e.g. <span>Holy Roman Emperor <span>Leopold I</span></span>
              // Ignore this case
              return;
            }

            const text = content.substring(0, annotation['@offset'] - beginingOffset)
            const textNode = document.createTextNode(text)

            beginingOffset = beginingOffset + text.length + annotation['@name'].length
            content = content.replace(text, '').replace(annotation['@name'], '')

            const currentAnnotatedElement = document.createElement('span')
            currentAnnotatedElement.innerHTML = annotation['@name']
            currentAnnotatedElement.setAttribute('itemscope', 'true')
            currentAnnotatedElement.setAttribute('itemtype', annotation.resource['@types'].split(", ").filter(type => type.startsWith("Schema:")).map(type => type.replace("Schema:", "https://schema.org/")).join(' '))

            elements.appendChild(textNode)
            elements.appendChild(currentAnnotatedElement)
          })

          elements.appendChild(document.createTextNode(content))
          let result = elements.innerHTML
          result = result.replaceAll('\n', '<br>')

          editor.selection.setContent(result)
        }).finally(() => {
          unmountDBPediaApp()
          enabledPropertyView = false;
        })
      } else {
        unmountDBPediaApp()
        enabledPropertyView = false;
      }
    }
  });
}