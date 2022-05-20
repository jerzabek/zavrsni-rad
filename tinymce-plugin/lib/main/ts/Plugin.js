var setup = function (editor, url) {
    editor.ui.registry.addButton('zavrad', {
        text: 'Annotate content',
        onAction: function () {
            editor.selection.setContent('<span itemscope itemtype="https://schema.org/example">' + editor.selection.getContent() + '</span>');
        }
    });
};
export default (function () {
    tinymce.PluginManager.add('zavrad', setup);
});
//# sourceMappingURL=Plugin.js.map