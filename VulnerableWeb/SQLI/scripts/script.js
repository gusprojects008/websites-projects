// frontend validatioan!
const username = document.getElementById("username");
const userComment = document.getElementById("user-comment");
//let username = document.getElementById("username");
//let userComment = document.getElementById("user-comment");
const sendData = document.getElementById("send-data");
const userComments = document.getElementById("users-comments");

sendData.addEventListener("click", async (e) => {
  e.preventDefault(); // Prevents form reloading
  const usernameValue = username.value.trim();
  const userCommentValue = userComment.value.trim();

  if (!usernameValue || usernameValue.length > 32) {
     alert("Insira um username de até 32 caracteres! (Enter a username of up 32 characters!)");
     return; // Stops function execution after executing "alert()"
     };
  if (!userCommentValue || userCommentValue.length > 32) {
     alert("Por favor, insira um comentário de até 32 caracteres! a(Please enter a comment of up to 32 charecters!)");
     return;
     };

  const userDataValues = new URLSearchParams();
  userDataValues.append("username", usernameValue);
  userDataValues.append("comment", userCommentValue);
  
  try {
    const res = await fetch("/VulnerableWeb/SQLI/scripts/endpointToAPI")
  } catch (error) {};
});

