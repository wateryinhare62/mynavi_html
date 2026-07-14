let filenameSpan = document.getElementById('filename');
let textContent = document.getElementById('textContent');

let savedFileHandle = null;
console.log(savedFileHandle);

function canUseFileSystem() {
    return ('showOpenFilePicker' in window) && window.isSecureContext;
}

document.getElementById('openButton').addEventListener('click', async () => {
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
            ],
            excludeAcceptAllOption: true,
            multiple: false,
            id: "write",
            startIn: "documents",
        }); 
        const file = await fileHandle.getFile();
        filenameSpan.textContent = file.name;
        const contents = await file.text();
        textContent.value = contents;
        savedFileHandle = fileHandle;
    } catch (err) {
        console.error('ファイルの読み込みに失敗しました。', err);
    }
});

document.getElementById('saveButton').addEventListener('click', async () => {
    if (!canUseFileSystem()) {
        console.error('File System Access APIが使えないかセキュアコンテキストではありません。');
        return;
    }
    try {
        const contents = textContent.value;
        const writable = await savedFileHandle.createWritable();
        await writable.write(contents);
        await writable.close();
    } catch (err) {
        console.error('ファイルの保存に失敗しました。', err);
    }
});

document.getElementById('saveAsButton').addEventListener('click', async () => {
    if (!canUseFileSystem()) {
        console.error('File System Access APIが使えないかセキュアコンテキストではありません。');
        return;
    }
    try {
        const contents = textContent.value;
        const handle = await window.showSaveFilePicker({
            suggestedName: 'newfile.txt',
            types: [
                {
                    description: "Text Files",
                    accept: {
                        "text/*": [".txt", ".md", ".csv"],
                    },
                },
            ],
            excludeAcceptAllOption: true,
            id: "write",
            startIn: "documents",
        });
        const writable = await handle.createWritable();
        await writable.write(contents);
        await writable.close();
    } catch (err) {
        console.error('ファイルの保存に失敗しました。', err);
    }
});
