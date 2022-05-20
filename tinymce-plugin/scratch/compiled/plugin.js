(function () {
    'use strict';

    var setup = function (editor, url) {
      editor.ui.registry.addButton('zavrad', {
        text: 'Annotate content',
        onAction: function () {
          editor.selection.setContent('<span itemscope itemtype="https://schema.org/example">' + editor.selection.getContent() + '</span>');
        }
      });
    };
    function Plugin () {
      tinymce.PluginManager.add('zavrad', setup);
    }

    Plugin();

})();
