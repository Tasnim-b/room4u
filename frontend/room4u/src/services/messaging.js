const API_URL = "http://localhost:8000";

export async function getConversations(token) {
  const res = await fetch(`${API_URL}/conversations/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export async function createOrGetConversation(token, userId) {
  const res = await fetch(`${API_URL}/conversations/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ user_id: userId })
  });
  return res.json();
}

export async function getMessages(token, conversationId) {
  const res = await fetch(`${API_URL}/conversations/${conversationId}/messages/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export async function sendMessage(token, conversationId, text) {
  const res = await fetch(`${API_URL}/conversations/${conversationId}/messages/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ text })
  });
  const data = await res.json();
  return { status: res.status, data };
}
