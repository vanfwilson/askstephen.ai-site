document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('chatics-toggle');
    const frame = document.getElementById('chatics-frame-wrapper');

    if (!toggle || !frame) return;

    // Optional close icon logic
    const closeBtn = document.getElementById('chatics-close');
    const fullscreenBtn = document.getElementById('chatics-fullscreen');

    toggle.addEventListener('click', function () {
        if (frame.style.display === 'flex') {
            // If already open, close it
            closeChat();
        } else {
            // If closed, open it
            frame.style.display = 'flex';
            // Add smooth animation
            setTimeout(() => {
                frame.classList.add('show');
            }, 10);
        }
    });

    function closeChat() {
        frame.classList.remove('show');
        frame.classList.remove('fullscreen');
        setTimeout(() => {
            frame.style.display = 'none';
        }, 300);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeChat);
    }

    // Fullscreen toggle functionality
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', function () {
            frame.classList.toggle('fullscreen');
        });
    }
});

