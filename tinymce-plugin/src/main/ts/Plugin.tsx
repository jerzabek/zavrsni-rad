import { Editor, TinyMCE } from 'tinymce';
import SetupDBPediaAnnotation from './SetupDBPediaAnnotation';
import SetupAnnotateProperty from './SetupAnnotateProperty';
import SetupAnnotateThing from './SetupAnnotateThing';

declare const tinymce: TinyMCE;

const setup = (editor: Editor): void => {
  SetupAnnotateThing(editor)
  SetupAnnotateProperty(editor)
  SetupDBPediaAnnotation(editor)
};

export default (): void => {
  tinymce.PluginManager.add('zavrad', setup);
};
