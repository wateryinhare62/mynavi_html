document.addEventListener('DOMContentLoaded', function () {
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

        const sourceImage = document.getElementById('target');
        const canvas = document.createElement('canvas');
        canvas.width = sourceImage.naturalWidth;
        canvas.height = sourceImage.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(sourceImage, 0, 0);
        canvas.toBlob(async (blob) => {
            const item = new ClipboardItem({
                'image/png': blob
            });
            try {
                await navigator.clipboard.write([item]);
                feedbackElement.textContent = 'コピーしました！';
            } catch (err) {
                feedbackElement.textContent = `コピーできませんでした: ${err.message}`;
            }
        });
    });
});
