const dialogElement = document.querySelector("dialog");
const showButton = document.querySelector("#showButton");
const outputElement = document.querySelector("output");
const selectElement = dialogElement.querySelector("select");
const confirmButton = dialogElement.querySelector("#confirm");

showButton.addEventListener("click", () => {
  dialogElement.showModal();
});

confirmButton.addEventListener("click", (event) => {
  event.preventDefault();
  dialogElement.close(selectElement.value);
});

dialogElement.addEventListener("close", (e) => {
  outputElement.value = dialogElement.returnValue === "default"?
    "戻り値はありません" :
    `好きな麺類は ${dialogElement.returnValue} ですね！`;
});
