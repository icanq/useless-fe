const API_BASE_URL = "https://useless-be-production.up.railway.app";

async function fetchMessages() {
  try {
    const response = await fetch(`${API_BASE_URL}/messages`);
    const data = await response.json();
    const messageContainer = document.getElementById("message-container");
    messageContainer.innerHTML = "";
    data.data.forEach((message) => {
      const newMessageList = document.createElement("li");
      newMessageList.textContent = `${message.name}: ${message.message}`;
      messageContainer.appendChild(newMessageList);
    })
  } catch (err) {
    console.error(err);
  }
}

async function sendMessage() {
  const name = document.getElementById("input-name").value;
  const message = document.getElementById("input-message").value;

  try {
    const sendMessage = await fetch(`${API_BASE_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, message })
  })
  const response = await sendMessage.json();

  if (response.success) {
    await fetchMessages(); // Refresh the message list after adding a new message
  } else {
    console.error(response.message);
  }
  } catch (error) {
    console.error('Error adding message:', error);
  }
}

fetchMessages()
