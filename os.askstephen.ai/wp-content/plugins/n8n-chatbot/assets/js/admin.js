jQuery(document).ready(function ($) {
    const iconInput = $('#chatics_icon_url');
    const previewDiv = $('#chatics_icon_preview');

    // Upload icon
    $('#chatics_upload_icon').on('click', function (e) {
        e.preventDefault();
        const frame = wp.media({
            title: 'Select or Upload Icon',
            button: { text: 'Use this icon' },
            multiple: false
        });

        frame.on('select', function () {
            const attachment = frame.state().get('selection').first().toJSON();
            iconInput.val(attachment.url);
            previewDiv.html(`
                <img src="${attachment.url}" style="max-width:50px;max-height:50px;">
                <button type="button" class="button button-secondary" id="chatics_remove_icon">Remove Icon</button>
            `);
        });

        frame.open();
    });

    // Remove icon
    $(document).on('click', '#chatics_remove_icon', function () {
        iconInput.val('');
        previewDiv.empty();
    });

    // Zoom label update
    $('#chatics_zoom').on('input', function () {
        $('#zoom-value').text($(this).val() + '%');
    });
     $('#chatics-doc-toggle').on('click', function (e) {
        e.preventDefault();
        $('#chatics-doc-box').slideToggle('fast');

        if ($(this).text().includes('▼')) {
            $(this).text($(this).text().replace('▼', '▲'));
        } else {
            $(this).text($(this).text().replace('▲', '▼'));
        }
    });
});
