$(function () {
    const socket = io();
    const $messages = $("#messages");
    const $form = $("#form");
    const $input = $("#input");
    
    let username = prompt("Please enter your name:");
    if (!username || username.trim() === "") {
      username = "Anonymous";
    }
  
    $form.submit(function () {
      const message = $input.val().trim();
      if (message !== "") {
        socket.emit("chat message", { username, message });
        $input.val("");
      }
      return false;
    });
  
    socket.on("chat message", function (data) {
      const { username, message } = data;
      const messageContainer = $("<div>").addClass("message-container");
      const messageElement = $("<div>")
        .attr("data-username", username)
        .addClass("message")
        .text(message);
      messageContainer.append(messageElement);
      $messages.append(messageContainer);
      $messages.scrollTop($messages[0].scrollHeight);
    });
  });
  