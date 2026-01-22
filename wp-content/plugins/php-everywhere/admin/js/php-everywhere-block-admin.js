/**
 * Block
 */
 ( function( blocks, i18n, element, blockEditor) {
	const currentPluginVersion = '3.0.0';
	const el = element.createElement;
    const __ = i18n.__;
    const PlainText = blockEditor.PlainText;

	const blockStyle = {
		backgroundColor: '#900',
		color: '#fff',
		padding: '20px',
	};

	blocks.registerBlockType( 'php-everywhere-block/php', {
		title: __( 'PHP Everywhere' ),
		description: __( 'Add custom PHP code.' ),
		icon: 'editor-code',
		category: 'formatting',
		attributes: {
			code: {
				type: 'string',
			},
			version: {
				type: 'string',
			},
		},
		edit: function( props ) {
			try {
				var content = decodeURIComponent(atob(props.attributes.code));
			}
			catch(e)
			{
				var content = "";
			}
			
			function onChangeContent( newContent ) {
				newContent = btoa(encodeURIComponent(newContent));
				props.setAttributes( { code: newContent, version: currentPluginVersion } );
			}

			return el(
				PlainText,
				{
					className: props.className,
					onChange: onChangeContent,
					placeholder: __( 'Write PHP... (including <?php ?> brackets)' ),
					value: content,
				}
			);
		},
		save: function( properties ) {
			return null;
		},
	} );
}(
	window.wp.blocks,
	window.wp.i18n,
    window.wp.element,
    window.wp.blockEditor
) );