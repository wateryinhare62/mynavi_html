if (!document.pictureInPictureEnabled) {
    alert('Picture-in-Pictureが利用可能ではありません。');
} else {
    const startButton = document.querySelector("#start");
    const pictureInPicture = document.querySelector("#picture-in-picture");

    startButton.addEventListener("click", async () => {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else {
          await pictureInPicture.requestPictureInPicture();
        }
    });

    pictureInPicture.addEventListener("enterpictureinpicture", () => {
      startButton.textContent = 'Picture-in-Pictureをやめる';
    });

    pictureInPicture.addEventListener("leavepictureinpicture", () => {
      startButton.textContent = 'Picture-in-Pictureをはじめる';
    });
}
