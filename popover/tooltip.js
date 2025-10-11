const popover = document.getElementById("popover");
const shoyu = document.getElementById("shoyu");
const shio = document.getElementById("shio");
const miso = document.getElementById("miso");

const openPopover = (event) => {
    const elem = event.target;
    const rect = elem.getBoundingClientRect();
    popover.textContent = elem.textContent + "味の美味しいラーメンです！";
    popover.style.inset = "unset";
    popover.style.left = (rect.x + 20) + "px";
    popover.style.top = (rect.y + 20) + "px";
    popover.showPopover();
}

const closePopover = () => {
    popover.hidePopover();
}

shoyu.addEventListener("mouseenter", openPopover);
shio.addEventListener("mouseenter", openPopover);
miso.addEventListener("mouseenter", openPopover);

shoyu.addEventListener("mouseout", closePopover);
shio.addEventListener("mouseout", closePopover);
miso.addEventListener("mouseout", closePopover);
