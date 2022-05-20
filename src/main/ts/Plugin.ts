import { Editor, TinyMCE } from 'tinymce';

declare const tinymce: TinyMCE;

const setup = (editor: Editor, url: string): void => {
  editor.ui.registry.addButton('zavrad', {
    text: 'zavrad button',
    onAction: () => {
      editor.setContent('<p>content added from zavrad</p>');
    }
  });
};

export default (): void => {
  tinymce.PluginManager.add('zavrad', setup);
};
