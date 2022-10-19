const chat = document.getElementById("chat");
const aside = document.getElementById("aside");
const main = document.getElementById("main");
const goToBackButtonChatList = document.getElementById(
    "goToBackButtonChatList"
);

const enterMessageWrapper = document.getElementById("enterMessageWrapper");
const enterMessageInput = document.getElementById("enterMessage--Input");
const personalMessageItems = document.querySelectorAll(".personalMessageItem");

function closeBlock(element) {
    element.classList.toggle("hide");
}

chat.scrollTop = chat.scrollHeight;

enterMessageInput.addEventListener("input", () => {
    if (enterMessageInput.scrollHeight > 360)
        return (enterMessageWrapper.style.height = "360px");

    if (enterMessageInput.value == "")
        return (enterMessageWrapper.style.height = "auto");

    enterMessageWrapper.style.height = enterMessageInput.scrollHeight + "px";
});

personalMessageItems.forEach((items, key) => {
    items.addEventListener("click", () => {
        closeBlock(aside);
        closeBlock(main);
    });
});

goToBackButtonChatList.addEventListener("click", () => {
    closeBlock(aside);
    closeBlock(main);
});
