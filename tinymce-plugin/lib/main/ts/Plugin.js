import { setupReactApp, unmountReactApp } from '../../application/App';
var enabled = false;
var setup = function (editor) {
    editor.ui.registry.addButton('zavrad', {
        text: 'Annotate content',
        onAction: function () {
            enabled = !enabled;
            if (enabled) {
                new Promise(function (resolve) {
                    setupReactApp(resolve);
                }).then(function (result) {
                    editor.selection.setContent('<span itemscope itemtype="https://schema.org/example">' + editor.selection.getContent() + result + '</span>');
                }).finally(function () {
                    unmountReactApp();
                    enabled = false;
                });
            }
            else {
                unmountReactApp();
                enabled = false;
            }
        }
    });
};
export default (function () {
    tinymce.PluginManager.add('zavrad', setup);
});
//# sourceMappingURL=Plugin.js.map