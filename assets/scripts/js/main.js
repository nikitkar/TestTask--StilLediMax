const chat = document.getElementById("chat");
chat.scrollTop = chat.scrollHeight;

const enterMessageWrapper = document.getElementById("enterMessageWrapper");
const enterMessageInput = document.getElementById("enterMessage--Input");

enterMessageInput.addEventListener("input", () => {
    if (enterMessageInput.scrollHeight > 360)
        return enterMessageWrapper.style.height = "360px";

    if(enterMessageInput.value == '') return enterMessageWrapper.style.height = 'auto'; 

    enterMessageWrapper.style.height = enterMessageInput.scrollHeight + "px";
});
