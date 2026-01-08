if (!document.pictureInPictureEnabled) {
    alert('Picture-in-Pictureが利用可能ではありません。');
} else {
    const startButton = document.querySelector("#start");
    const pictureInPicture = document.querySelector("#picture-in-picture");

    startButton.addEventListener("click", async () => {
        await pictureInPicture.requestPictureInPicture();
    });
}
