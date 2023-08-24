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

    const emojiMap = {
      react: "⚛️",
      woah: "😲",
      hey: "👋",
      lol: "😂",
      like: "🤍",
      congratulations: "🎉",
    };

    const newMessage = message.split(" ").map(item => {
      for (const key in emojiMap) {
        if (key.toLowerCase() === item.toLowerCase()) {
          return emojiMap[key];
        }
        return item;
      }
    })

    $messages.append($("<div>").html(`<span class="username">${username}:</span> ${newMessage}`).addClass("message"));
    $messages.scrollTop($messages[0].scrollHeight);
  });
});
