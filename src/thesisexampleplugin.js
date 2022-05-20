import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';

import ckeditor5Icon from '../theme/icons/ckeditor.svg';

export default class ThesisExamplePlugin extends Plugin {
	static get pluginName() {
		return 'ThesisExamplePlugin';
	}

	init() {
		const editor = this.editor;
		const t = editor.t;
		const model = editor.model;

		// Add the "thesisExamplePlugin" button to feature components.
		editor.ui.componentFactory.add( 'myThesisExampleButton', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: t( 'My thesis example plugin' ),
				icon: ckeditor5Icon,
				tooltip: true,
				isToggleable: true
			} );

			// Insert a text into the editor after clicking the button.
			this.listenTo( view, 'execute', () => {
				model.change( writer => {
					const textNode = writer.createText( 'Hello world! #FER' );

					model.insertContent( textNode );
				} );

				editor.editing.view.focus();
			} );

			return view;
		} );
	}
}
