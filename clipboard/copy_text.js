document.addEventListener('DOMContentLoaded', function () {
    const buttonElement = document.getElementById('button');
    const feedbackElement = document.getElementById('feedback');

    function canUseClipboard() {
        return !!navigator.clipboard && window.isSecureContext;
    }

    buttonElement.addEventListener('click', async () => {
        if (!canUseClipboard()) {
            feedbackElement.textContent = 'Clipboard APIは安全なコンテキストでのみ利用可能です。';
            return;
        }

        const sourceText = document.getElementById('target').textContent;
        try {
            await navigator.clipboard.writeText(sourceText);
            feedbackElement.textContent = 'コピーしました！';
        } catch (err) {
            feedbackElement.textContent = `コピーできませんでした: ${err.message}`;
        }
    });
});
