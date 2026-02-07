if (!CSS.highlights) {
    alert('CSS Custom Highlightをサポートしていません。');
} else {
    // 検索ボックスと検索対象の要素を取得
    const text_box1 = document.getElementById('search_text1');
    const text_box2 = document.getElementById('search_text2');
    const target = document.querySelector('div#target');

    // Textノードの配列を生成
    const tw = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    let currentNode = tw.nextNode();
    while (currentNode) {
        textNodes.push(currentNode);
        currentNode = tw.nextNode();
    }

    // ハイライトを作成する関数
    function createHighlight(i, search_text) {
        // 検索テキストが空の場合は処理を終了
        if (search_text === '') {
            return;
        }
        // すべてのTextノードから検索テキストを探す
        const ranges = textNodes
            // Textノードとその内容の配列を生成
            .map((elem) => {
                return {
                    elem: elem,
                    text: elem.textContent
                };
            })
            // 各Textノード内で検索テキストを検索して位置の配列を生成
            .map(({ text, elem }) => {
                const indices = [];
                let startPos = 0;
                while (startPos < text.length) {
                    const index = text.indexOf(search_text, startPos);
                    if (index === -1) {
                        break;
                    }
                    indices.push(index);
                    startPos = index + search_text.length;
                }
                // 見つかった位置に対してRangeオブジェクトの配列を生成
                return indices.map((index) => {
                    const range = new Range();
                    range.setStart(elem, index);
                    range.setEnd(elem, index + search_text.length);
                    return range;
                });
            });
        // Highlightオブジェクトを生成して登録
        const highlight = new Highlight(...ranges.flat());
        CSS.highlights.set(`search-result-${i}`, highlight);
    }

    // 検索テキストボックスのイベントハンドラ
    function inputListener() {
        // HighlightRegistryをクリア
        CSS.highlights.clear();
        // 個別にハイライトを作成
        createHighlight('1', text_box1.value.trim());
        createHighlight('2', text_box2.value.trim());
    }

    // イベントリスナを登録
    text_box1.addEventListener('input', inputListener);
    text_box2.addEventListener('input', inputListener);
}
