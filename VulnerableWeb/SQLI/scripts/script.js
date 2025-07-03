const username = document.getElementById("username");
const userComment = document.getElementById("user-comment");
const sendData = document.getElementById("send-data");
const userComments = document.getElementById("users-comments");

sendData.addEventListener("click", async (e) => {
  e.preventDefault(); // Prevents form reloading
  const usernameValue = username.value.trim();
  const userCommentValue = userComment.value.trim();

  if (!usernameValue) {
     alert("Insira um username de até 32 caracteres! (Enter a username of up 32 characters!)");
     return;
     }
  
});

  const userPost = {};
