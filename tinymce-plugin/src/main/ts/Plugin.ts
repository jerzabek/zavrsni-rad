import { Editor, TinyMCE } from 'tinymce';

declare const tinymce: TinyMCE;

const setup = (editor: Editor, url: string): void => {
  editor.ui.registry.addButton('zavrad', {
    text: 'Annotate content',
    onAction: () => {
      editor.selection.setContent('<span itemscope itemtype="https://schema.org/example">' + editor.selection.getContent() + '</span>');
    }
  });
};

export default (): void => {
  tinymce.PluginManager.add('zavrad', setup);
};
