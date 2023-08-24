$(function () {
  const socket = io();
  const $messages = $("#messages");
  const $form = $("#form");
  const $input = $("#input");
  const $username = $("#username");

  const emojiMap = {
    react: "⚛️",
    woah: "😲",
    hey: "👋",
    lol: "😂",
    like: "🤍",
    congratulations: "🎉",
  };

  $form.submit(function () {
      const username = $username.val().trim();
      let message = $input.val().trim(); // Get the user's message

      // Replace message words with emojis based on the emojiMap
      message = message.replace(/\b\w+\b/g, match => {
          return emojiMap[match.toLowerCase()] || match;
      });

      if (username !== "" && message !== "") {
          socket.emit("chat message", { username, message });
          $input.val("");
      }
      return false;
  });

  socket.on("chat message", function (data) {
      const { username, message } = data;
      $messages.append($("<div>").html(`<span class="username">${username}:</span> ${message}`).addClass("message"));
      $messages.scrollTop($messages[0].scrollHeight);
  });
});

