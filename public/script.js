$(function () {
  const socket = io();
  const $messages = $("#messages");
  const $form = $("#form");
  const $input = $("#input");
  const $username = $("#username"); // Add this line to get the username input field

  $form.submit(function () {
    const username = $username.val().trim(); // Get the username
    const message = $input.val().trim();

    if (username !== "" && message !== "") {
      socket.emit("chat message", { username, message }); // Send username and message
      $input.val("");
    }
    return false;
  });

  socket.on("chat message", function (data) {
    const { username, message } = data; // Extract username and message from received data
    $messages.append($("<div>").html(`<span class="username">${username}:</span> ${message}`).addClass("message"));
    $messages.scrollTop($messages[0].scrollHeight);
  });
});
