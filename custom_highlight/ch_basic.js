if (!CSS.highlights) {
    alert('CSS Custom Highlightをサポートしていません。');
} else {
    const elem = document.getElementById('garden_at_night');

    // 範囲オブジェクトの生成
    const range = new Range();
    range.setStart(elem, 0);
    range.setEnd(elem, 1);

    // ハイライトオブジェクトの生成と登録
    const highlight = new Highlight(range);
    CSS.highlights.set("highlight", highlight);
}
