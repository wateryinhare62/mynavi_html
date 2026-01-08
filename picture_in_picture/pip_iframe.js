const startButton = document.querySelector("#start");
const pictureInPicture = document.querySelector("#picture-in-picture");

startButton.addEventListener("click", async () => {
  const pictureInPictureWindow = await documentPictureInPicture.requestWindow({
    width: pictureInPicture.clientWidth,
    height: pictureInPicture.clientHeight,
    copyStyleSheets: true,
  });
  pictureInPictureWindow.document.body.append(pictureInPicture);

  pictureInPictureWindow.addEventListener("unload", (event) => {
    const pipContainer = document.querySelector("#pip-container");
    const pictureInPicture = event.target.querySelector("#picture-in-picture");
    pipContainer.append(pictureInPicture);
  });
});
