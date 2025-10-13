const shoyu = document.getElementById("shoyu");
const shio = document.getElementById("shio");
const miso = document.getElementById("miso");
const popoverShoyu = document.getElementById("popover-shoyu");
const popoverShio = document.getElementById("popover-shio");
const popoverMiso = document.getElementById("popover-miso");

shoyu.addEventListener("mouseenter", () => { popoverShoyu.showPopover(); });
shio.addEventListener("mouseenter", () => { popoverShio.showPopover(); });
miso.addEventListener("mouseenter", () => { popoverMiso.showPopover(); });

shoyu.addEventListener("mouseout", () => { popoverShoyu.hidePopover(); });
shio.addEventListener("mouseout", () => { popoverShio.hidePopover(); });
miso.addEventListener("mouseout", () => { popoverMiso.hidePopover(); });
