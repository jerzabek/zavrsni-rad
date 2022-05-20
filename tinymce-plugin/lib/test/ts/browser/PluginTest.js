import { TinyAssertions, TinyHooks, TinyUiActions } from '@ephox/mcagar';
import Plugin from '../../../main/ts/Plugin';
// This an example of a browser test of the editor.
describe('browser.PluginTest', function () {
    var hook = TinyHooks.bddSetup({
        plugins: 'zavrad',
        toolbar: 'zavrad'
    }, [Plugin]);
    it('test click on button', function () {
        var editor = hook.editor();
        TinyUiActions.clickOnToolbar(editor, 'button:contains("zavrad button")');
        TinyAssertions.assertContent(editor, '<p>content added from zavrad</p>');
    });
});
//# sourceMappingURL=PluginTest.js.map