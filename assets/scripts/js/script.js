let socket = io();

const Form = document.getElementById("enterMessageWrapper");
const messageValueForm = document.getElementById("enterMessage--Input");
const chatWrapper = document.getElementById("chat");

const NameUserList = [
    "Иван",
    "Андрей",
    "Яков",
    "Юрий",
    "Татьяна",
    "Мария",
    "Авдотья",
    "Елизавета",
    "Станислав",
    "Радомир",
    "Добромила",
    "Рада",
    "Любава",
];
const nameUser =
    NameUserList[Math.floor(Math.random() * (NameUserList.length - 1))];

socket.emit("new-user", nameUser);

function checkMinutes(minutes) {
    if (minutes < 10) return "0" + minutes;
    else return minutes;
}

function appendMessageUsers(message) {
    const messageDiv = document.createElement("div");

    messageDiv.className = "userMessage";
    messageDiv.innerHTML = `
    <div class="userMessage--ContentBlock">
        <p class="userMessage--Name">${name}</p>
        <p class="userMessage--ContentMessage">${message}</p>
        <time class="userMessage--Time">${new Date().getHours()}:${checkMinutes(
        new Date().getMinutes()
    )}</time>
    </div>
    `;
    chatWrapper.append(messageDiv);
}

function appendMessageYour(message) {
    const messageDiv = document.createElement("div");

    messageDiv.className = "yourMessage";
    messageDiv.innerHTML = `
    <div class="yourMessage--ContentBlock">
        <p class="yourMessage--ContentMessage">${message}</p>
        <time class="yourMessage--Time">${new Date().getHours()}:${checkMinutes(
        new Date().getMinutes()
    )}</time>
    </div>
    `;
    chatWrapper.append(messageDiv);
}

function appendMessageDate() {
    const messageDiv = document.createElement("div");

    messageDiv.className = "departureDate";
    messageDiv.innerHTML = `
    <hr class="departureDate--Hr" />
        <time class="departureDate--Time">${new Date().getDay()}/${checkMinutes(
        new Date().getMinutes()
    )}/${new Date().getFullYear}<time>
    <hr class="departureDate--Hr" />
    `;
    chatWrapper.append(messageDiv);
}

Form.addEventListener("submit", (e) => {
    e.preventDefault();

    const message = messageValueForm.value;
    socket.emit("send-chat-message", message);
    messageValueForm.value = "";
});

socket.on("chat-message-users", (message) => {
    appendMessageUsers(message);
});

socket.on("chat-message-your", (message) => {
    appendMessageYour(message);
});

socket.on("user-connected", (message) => {
    appendMessageUsers(`Пользователь ${message} присоединился к чату`);
});

socket.on("user-disconnected", (message) => {
    appendMessageUsers(`Пользователь ${message} вышел из чата`);
});
