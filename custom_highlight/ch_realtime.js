if (!CSS.highlights) {
    alert('CSS Custom Highlightをサポートしていません。');
} else {
    // 検索文字列入力ボックスと検索対象の要素を取得
    const textBox1 = document.getElementById('search_text1');
    const textBox2 = document.getElementById('search_text2');
    const target = document.querySelector('div#target');

    // Textノードとテキストの配列を生成
    const tw = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    let currentNode = tw.nextNode();
    while (currentNode) {
        textNodes.push({node: currentNode, text: currentNode.textContent});
        currentNode = tw.nextNode();
    }
    //console.log(textNodes);
    
    // Textノード配列内で指定されたテキストを検索し、ハイライトを適用する関数
    const createHighlight = (index, searchText) => {
        // 検索テキストが空の場合は処理を終了
        if (searchText === '') {
            return;
        }
        // すべてのTextノードから検索テキストを探す
        const ranges = textNodes.map(({node, text}) => {
            // 指定されたテキストが出現するすべての位置を検索
            const indices = [];
            let startPos = 0;
            while (startPos < text.length) {
                const index = text.indexOf(searchText, startPos);
                if (index === -1) {
                    break;
                }
                indices.push(index);
                startPos = index + searchText.length;
            }
            // 見つかった位置に対してRangeオブジェクトの配列を生成
            const ranges = indices.map(i => {
                const range = new Range();
                range.setStart(node, i);
                range.setEnd(node, i + searchText.length);
                return range;
            });
            return ranges;
        });
        //console.log(ranges.flat());
        // Highlightオブジェクトを生成して登録
        const highlight = new Highlight(...ranges.flat());
        CSS.highlights.set(`highlight-${index}`, highlight);
    };

/*
    // ハイライトを作成する関数
    function createHighlight(i, searchText) {
        // 検索テキストが空の場合は処理を終了
        if (searchText === '') {
            return;
        }
        // すべてのTextノードから検索テキストを探す
        const ranges = textNodes
            // Textノードとその内容の配列を生成
            .map(elem => {
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
                    const index = text.indexOf(searchText, startPos);
                    if (index === -1) {
                        break;
                    }
                    indices.push(index);
                    startPos = index + searchText.length;
                }
                // 見つかった位置に対してRangeオブジェクトの配列を生成
                return indices.map(index => {
                    const range = new Range();
                    range.setStart(elem, index);
                    range.setEnd(elem, index + searchText.length);
                    return range;
                });
            });
        // Highlightオブジェクトを生成して登録
        const highlight = new Highlight(...ranges.flat());
        CSS.highlights.set(`search-result-${i}`, highlight);
    }
*/

    // 検索テキストボックスのイベントハンドラ
    function inputListener() {
        // HighlightRegistryをクリア
        CSS.highlights.clear();
        // 個別にハイライトを作成
        createHighlight('1', textBox1.value.trim());
        createHighlight('2', textBox2.value.trim());
    }

    // イベントリスナを登録
    textBox1.addEventListener('input', inputListener);
    textBox2.addEventListener('input', inputListener);
}
