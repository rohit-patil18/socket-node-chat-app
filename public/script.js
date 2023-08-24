$(function () {
    const socket = io();
    const $messages = $("#messages");
    const $form = $("#form");
    const $input = $("#input");

    $form.submit(function () {
        const message = $input.val().trim();
        if (message !== "") {
            socket.emit("chat message", message);
            $input.val("");
        }
        return false;
    });

    socket.on("chat message", function (msg) {
        $messages.append($("<div>").text(msg).addClass("message"));
        $messages.scrollTop($messages[0].scrollHeight);
    });
});