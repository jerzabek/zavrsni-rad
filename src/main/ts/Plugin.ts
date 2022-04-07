import { Editor, TinyMCE } from 'tinymce';

declare const tinymce: TinyMCE;

const setup = (editor: Editor, url: string): void => {
  editor.ui.registry.addButton('tinymce-bsc-thesis-tinymce-example', {
    text: 'Annotate (example)',
    onAction: () => {
      // An example demonstrating how to insert microdata into selected text programatically
      editor.selection.setContent('<span itemscope itemtype="https://schema.org/example">' + editor.selection.getContent() + '</span>');
    }
  });
};

export default (): void => {
  tinymce.PluginManager.add('tinymce-bsc-thesis-tinymce-example', setup);
};
