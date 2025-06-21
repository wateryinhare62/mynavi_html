const dialogElement = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");

showButton.addEventListener("click", () => {
    dialogElement.showModal();
});
