if (!CSS.highlights) {
    alert('CSS Custom Highlightをサポートしていません。');
} else {
    // 検索対象のTextノードとテキストを取得
    const node = document.querySelector('pre').firstChild;
    const text = node.textContent;

    // ハイライトする検索文字列の配列
    const searchWords = [
        {index: 1, text: 'int'},
        {index: 2, text: 'array'},
        {index: 3, text: 'for'}
    ];
    // Textノード内で指定されたテキストを検索し、ハイライトを適用する関数
    const createHighlight = (index, searchText) => {
        // 指定されたテキストが出現するすべての位置を検索
        const indices = [];
        let startPos = 0;
        while (startPos < text.length) {
            const index = text.indexOf(searchText, startPos);
            if (index === -1) break;
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
        // Highlightオブジェクトを生成して登録
        const highlight = new Highlight(...ranges);
        CSS.highlights.set(`highlight-${index}`, highlight);
    };
    // それぞれの検索文字列についてハイライトを作成
    searchWords.forEach(({index, text}) => {
        createHighlight(index, text);
    });
}
