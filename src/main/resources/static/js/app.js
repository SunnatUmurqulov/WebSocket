
var stompClient = null;

// Ulashish holatiga qarab "Start" va "Stop" tugmalarni faollashtirish yoki o'chirish.
function resetProperties(connected) {
    // Ulangan holatga qarab "Boshlash" va "To'xtash" tugmalarni faollashtirish yoki o'chirish
    $("#button-start").prop("disabled", connected);
    $("#button-stop").prop("disabled", !connected);
    if (connected) {
        // Ulangan holatda kiritish guruhi ko'rsatiladi
        $("#input-group").show();
        $("#info-text").html("You are connected");
    } else {
        // Ulashilmagan holatda kiritish guruhi yashiriladi
        $("#input-group").hide();
        $("#info-text").html("You are not connected");
    }
}

//WebSocket ulanganishi uchun SockJS obyektini yaratish,
// STOMP protokolini ishlatish uchun stompClient obyektini yaratish va ulanishni boshlash.
    function connect() {
    // WebSocket ulanganishi uchun SockJS obyektini yaratish
    var socket = new SockJS('/websocket-chat');
    // STOMP protokolini ishlatish uchun stompClient obyektini yaratish
    stompClient = Stomp.over(socket);
    // STOMP ulanishni boshlash
    stompClient.connect({}, function (frame) {
        console.log("Successfully connected!!!")
        resetProperties(true);
        console.log('Connected: ' + frame);
        // "/chat/message" manzilini tinglash
        stompClient.subscribe('/chat/message', function (greeting) {
            // Xabarni sahifada ko'rsatish
            showMessageOnPage(JSON.parse(greeting.body).message);
        });
        // stompClient.subscribe('/chat/numbers',function (payload) {
        //     console.log(payload)
        // })
    });
}

function disconnect() {
    if (stompClient !== null) {
        // STOMP ulanishni to'xtatish
        stompClient.disconnect();
    }
    // Ulashish holatini tiklash
    resetProperties(false);
    console.log("Disconnected");
}

// STOMP ulanishni to'xtatish va ulashish holatini tiklash.
function sendMessage() {
    // Xabar yuborish
    stompClient.send("/app/sendMessage", {}, JSON.stringify({'message': $("#message-input").val().trim()}));
}

function showMessageOnPage(message) {
    // Xabarni sahifada ko'rsatish
    $("#message").append("<p>" + message + "</p>");
}

$(function () {
    // Formani submit qilishni to'xtatish
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    // "start" tugmasi bosilganda ulanishni boshlash
    $("#button-start").click(function () {
        connect();
    });
    // "stop" tugmasi bosilganda ulanishni to'xtatish
    $("#button-stop").click(function () {
        disconnect();
    });
    // "send" tugmasi bosilganda xabar yuborish
    $("#button-send").click(function () {
        sendMessage();
    });
});
