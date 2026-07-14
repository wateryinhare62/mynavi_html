const dropTarget = document.getElementById('drop-target');

function canUseFileSystem() {
    return ('showOpenFilePicker' in window) && window.isSecureContext;
}

dropTarget.addEventListener('dragover', (event) => {
    event.preventDefault();
});

dropTarget.addEventListener('drop', async (event) => {
    if (!canUseFileSystem()) {
        console.error('File System Access APIが使えないかセキュアコンテキストではありません。');
        return;
    }
    console.log('drop event');
    event.preventDefault();
    const items = event.dataTransfer.items;
    for (const item of items) {
        if (item.kind === 'file') {
            const file = item.getAsFile();
            document.getElementById('filename').textContent = file.name;
            const textContent = document.getElementById('textContent');
            const imageContent = document.getElementById('imageContent');
            if (file.type.startsWith('text/')) {
                const contents = await file.text();
                textContent.value = contents;
                textContent.style.display = 'block';
                imageContent.style.display = 'none';
            } else if (file.type.startsWith('image/')) {
                const img = new Image();
                img.onload = () => {
                    const targetCanvas = imageContent;
                    const targetContext = targetCanvas.getContext('2d');
                    targetCanvas.width = img.width;
                    targetCanvas.height = img.height;
                    targetContext.drawImage(img, 0, 0);
                    textContent.style.display = 'none';
                    imageContent.style.display = 'block';
                };
                img.src = URL.createObjectURL(file);
            }
            break;
        }
    }
});
