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

        try {
            const clipboardItems = await navigator.clipboard.read();
            for (const clipboardItem of clipboardItems) {
                if (clipboardItem.types.includes('image/png')) {
                    const blob = await clipboardItem.getType('image/png');
                    const img = new Image();
                    img.onload = () => {
                        const targetCanvas = document.getElementById('target');
                        const targetContext = targetCanvas.getContext('2d');
                        targetContext.drawImage(img, 0, 0);
                        feedbackElement.textContent = '貼り付けました！';
                    };
                    img.src = URL.createObjectURL(blob);
                } else {
                    feedbackElement.textContent = 'クリップボードに画像が見つかりませんでした。';
                }
            }
        } catch (err) {
            feedbackElement.textContent = `貼り付けできませんでした: ${err.message}`;
        }
    });
});
