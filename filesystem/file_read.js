const textContent = document.getElementById('textContent');
const imageContent = document.getElementById('imageContent');

function canUseFileSystem() {
    return ('showOpenFilePicker' in window) && window.isSecureContext;
}

document.getElementById('readButton').addEventListener('click', async () => {
    if (!canUseFileSystem()) {
        console.error('File System Access APIが使えないかセキュアコンテキストではありません。');
        return;
    }
    try {
        const [fileHandle] = await window.showOpenFilePicker({
            types: [
                {
                    description: "Text Files",
                    accept: {
                        "text/*": [".txt", ".md", ".csv"],
                    },
                },
                {
                    description: "Image Files",
                    accept: {
                        "image/*": [".png", ".jpg", ".jpeg", ".gif"],
                    },
                }
            ],
            excludeAcceptAllOption: true,
            multiple: false,
            id: "read",
            startIn: "documents",
        }); 
        const file = await fileHandle.getFile();
        document.getElementById('filename').textContent = file.name;
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
    } catch (err) {
        console.error('ファイルの読み込みに失敗しました。', err);
    }
});
