document.addEventListener('DOMContentLoaded', function () {
    const targetElement = document.getElementById('target');
    const buttonElement = document.getElementById('button');
    const feedbackElement = document.getElementById('feedback');

    function canUseClipboard() {
        return !!navigator.clipboard && window.isSecureContext;
    }

    buttonElement.addEventListener('click', async function () {
        if (!canUseClipboard()) {
            feedbackElement.textContent = 'Clipboard APIは安全なコンテキストでのみ利用可能です。';
            return;
        }

        try {
            const text = await navigator.clipboard.readText();
            targetElement.value = text;
            feedbackElement.textContent = '貼り付けました！';
        } catch (err) {
            feedbackElement.textContent = `貼り付けできませんでした: ${err.message}`;
        }
    });
});
