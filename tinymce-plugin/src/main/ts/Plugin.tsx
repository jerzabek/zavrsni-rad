import { Editor, TinyMCE } from 'tinymce';
import { setupReactApp, unmountReactApp } from '../../application/App'

declare const tinymce: TinyMCE;

let enabled = false;

const setup = (editor: Editor): void => {
  editor.ui.registry.addButton('zavrad', {
    text: 'Annotate content',
    onAction: () => {
      enabled = !enabled;

      if (enabled) {
        new Promise((resolve) => {
          setupReactApp(resolve)
        }).then(result => {
          editor.selection.setContent('<span itemscope itemtype="https://schema.org/example">' + editor.selection.getContent() + result + '</span>');
        }).finally(() => {
          unmountReactApp()
          enabled = false;
        })
      } else {
        unmountReactApp()
        enabled = false;
      }
    }
  });
};

export default (): void => {
  tinymce.PluginManager.add('zavrad', setup);
};
