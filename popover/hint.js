const hint1 = document.getElementById("hint-1");
const hint2 = document.getElementById("hint-2");
const popover_hint1 = document.getElementById("popover-hint-1");
const popover_hint2 = document.getElementById("popover-hint-2");

hint1.addEventListener("mouseenter", () => { popover_hint1.showPopover(); });
hint2.addEventListener("mouseenter", () => { popover_hint2.showPopover(); });

hint1.addEventListener("mouseout", () => { popover_hint1.hidePopover(); });
hint2.addEventListener("mouseout", () => { popover_hint2.hidePopover(); });
