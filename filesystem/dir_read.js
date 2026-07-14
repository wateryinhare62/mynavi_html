let directoryHandle = null;
const selectDirButton = document.getElementById('select-button');
const dirname = document.getElementById('dirname');
const nameInput = document.getElementById('name-input');
const createFileButton = document.getElementById('create-file-button');
const createDirButton = document.getElementById('create-dir-button');
const resultMessage = document.getElementById('result-message');
const dirContent = document.getElementById('dir-content');

function canUseFileSystem() {
    return ('showOpenFilePicker' in window) && window.isSecureContext;
}

async function showDirectoryContents(dirHandle) {
    try {
        dirname.textContent = dirHandle.name;
        dirContent.innerHTML = '';
        for await (const entry of dirHandle.values()) {
            const name = await entry.name;
            let typed_name = name;
            if (entry.kind === 'directory') {
                typed_name = '[DIR] ' + name;
            }
            dirContent.innerHTML += `<p><a href="#" id="entry-${name}">[X]</a>${typed_name}</p>`;
        }
    } catch (err) {
        console.error(err);
    }
}

selectDirButton.addEventListener('click', async () => {
    if (!canUseFileSystem()) {
        console.error('File System Access APIが使えないかセキュアコンテキストではありません。');
        return;
    }
    try {
        directoryHandle = await window.showDirectoryPicker();
        showDirectoryContents(directoryHandle);
        resultMessage.textContent = 'ディレクトリの内容を表示しました。';
        dirContent.addEventListener('click', async (event) => {
            event.preventDefault();
            console.log(event);
            let aTag = event.target.closest('a');
            if (/*event.target.tagName === 'a' &&*/ aTag.id.startsWith('entry-')) {
                const name = aTag.id.substring(6);
                console.log('Clicked on entry: ' + name);
                if (!confirm(`本当に ${name} を削除しますか？`)) {
                    return;
                }
                await directoryHandle.removeEntry(name, { recursive: true });
                showDirectoryContents(directoryHandle);
                resultMessage.textContent = `${name} を削除しました。`;
            }
        });
    } catch (err) {
        console.error(err);
    }
});

createFileButton.addEventListener('click', async () => {
    if (!canUseFileSystem()) {
        console.error('File System Access APIが使えないかセキュアコンテキストではありません。');
        return;
    }
    const filename = nameInput.value.trim();
    if (!filename) {
        resultMessage.textContent = 'ファイル名を入力してください。';
        return;
    }
    try {
        const fileHandle = await directoryHandle.getFileHandle(filename, { create: true });
        //console.log(`ファイル ${filename} を作成しました。`);
        showDirectoryContents(directoryHandle);
        resultMessage.textContent = `ファイル ${filename} を作成しました。`;
    } catch (err) {
        console.error(err);
    }
});

createDirButton.addEventListener('click', async () => {
    if (!canUseFileSystem()) {
        console.error('File System Access APIが使えないかセキュアコンテキストではありません。');
        return;
    }
    const dirnameInput = nameInput.value.trim();
    if (!dirnameInput) {
        resultMessage.textContent = 'ディレクトリ名を入力してください。';
        return;
    }
    try {
        const newDirHandle = await directoryHandle.getDirectoryHandle(dirnameInput, { create: true });
        //console.log(`ディレクトリ ${dirnameInput} を作成しました。`);
        showDirectoryContents(directoryHandle);
        resultMessage.textContent = `ディレクトリ ${dirnameInput} を作成しました。`;
    } catch (err) {
        console.error(err);
    }
});