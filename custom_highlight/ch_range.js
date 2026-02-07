if (!CSS.highlights) {
    alert('CSS Custom Highlightをサポートしていません。');
} else {
    const elems = document.querySelectorAll('p');

    // 範囲オブジェクトの生成
    const ranges = [];
    elems.forEach((elem) => {
        const range = new Range();
        range.setStart(elem, 0);
        range.setEnd(elem, 1);
        ranges.push(range);
    });

    // ハイライトオブジェクトの生成と登録
    const highlight = new Highlight(...ranges);
    CSS.highlights.set("highlight", highlight);
}
