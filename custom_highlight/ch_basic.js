// Custom Highlightがサポートされているかチェック
if (!CSS.highlights) {
    alert('CSS Custom Highlightをサポートしていません。');
} else {
    // ハイライト対象のTextノードを取得
    const node = document.querySelector('pre').firstChild;

    // 範囲オブジェクトの生成
    const range = new Range();
    range.setStart(node, 14);
    range.setEnd(node, 18);

    // ハイライトオブジェクトの生成と登録
    const highlight = new Highlight(range);
    CSS.highlights.set("highlight", highlight);
}
