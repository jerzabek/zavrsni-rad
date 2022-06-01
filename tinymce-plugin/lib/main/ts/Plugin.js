import SetupDBPediaAnnotation from './SetupDBPediaAnnotation';
import SetupAnnotateProperty from './SetupAnnotateProperty';
import SetupAnnotateThing from './SetupAnnotateThing';
var setup = function (editor) {
    SetupAnnotateThing(editor);
    SetupAnnotateProperty(editor);
    SetupDBPediaAnnotation(editor);
};
export default (function () {
    tinymce.PluginManager.add('zavrad', setup);
});
//# sourceMappingURL=Plugin.js.map