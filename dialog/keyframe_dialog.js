const dialogElement = document.querySelector("dialog");
const showButton = document.querySelector(".show");
const closeButton = document.querySelector(".close");

showButton.addEventListener("click", () => {
  dialogElement.showModal();
});

closeButton.addEventListener("click", () => {
  dialogElement.close();
});