const openBtn = document.getElementById("addContactButton");
const createContactBtn = document.getElementById("createContactButton");
const popupWindow = document.getElementById("pop-up");

openBtn.addEventListener("click", () => {
    popupWindow.classList.add("open");
});

createContactBtn.addEventListener("click", () => {
    popupWindow.classList.remove("open");
});