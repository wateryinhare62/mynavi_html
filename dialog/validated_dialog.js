const dialogElement = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("#js-close");

showButton.addEventListener("click", () => {
    dialogElement.showModal();
});

closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialogElement.close();
});
