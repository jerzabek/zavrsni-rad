import { Editor, TinyMCE } from 'tinymce';

declare const tinymce: TinyMCE;

const setup = (editor: Editor, url: string): void => {
  editor.ui.registry.addButton('tinymce-bsc-thesis-tinymce-example', {
    text: 'tinymce-bsc-thesis-tinymce-example button',
    onAction: () => {
      editor.setContent('<p>content added from tinymce-bsc-thesis-tinymce-example</p>');
    }
  });
};

export default (): void => {
  tinymce.PluginManager.add('tinymce-bsc-thesis-tinymce-example', setup);
};
