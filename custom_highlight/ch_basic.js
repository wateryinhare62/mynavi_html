// Custom Highlightがサポートされているかチェック
if (!CSS.highlights) {
    alert('CSS Custom Highlightをサポートしていません。');
} else {
    // ハイライト対象のTextノードを取得
    const node = document.querySelector('pre').firstChild;

    // ハイライトする位置の配列（start, endのペア）
    const positions = [
        {start: 35, end: 38},
        {start: 54, end: 57}
    ];

    // 範囲オブジェクトの生成
    const ranges = [];
    positions.forEach(({start, end}) => {
        const range = new Range();
        range.setStart(node, start);
        range.setEnd(node, end);
        ranges.push(range);
    });

    // ハイライトオブジェクトの生成と登録
    const highlight = new Highlight(...ranges);
    CSS.highlights.set("highlight", highlight);
}
