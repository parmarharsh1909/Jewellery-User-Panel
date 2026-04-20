import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Chatai() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {

    if (!message) return;

    const userMsg = { sender: "user", text: message };

    setChat((prev) => [...prev, userMsg]);

    try {

      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: message
        })
      });

      const data = await res.json();

      const aiMsg = {
        sender: "ai",
        text: data.reply
      };

      setChat((prev) => [...prev, aiMsg]);

    } catch (error) {
      console.error(error);
    }

    setMessage("");
  };

  return (

    <div style={{ padding: "20px" }}>

      <h2>Gemini AI Assistant 🤖</h2>

      <div
        style={{
          border: "1px solid #ccc",
          height: "400px",
          overflowY: "scroll",
          padding: "10px",
          marginBottom: "10px",
          background: "#f9f9f9"
        }}
      >

        {chat.map((msg, index) => (

          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              marginBottom: "15px"
            }}
          >

            <b>{msg.sender === "user" ? "You" : "AI"}:</b>

            <div style={{ display: "inline-block", maxWidth: "80%" }}>

              {msg.sender === "ai" ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.text}
                </ReactMarkdown>
              ) : (
                <span>{msg.text}</span>
              )}

            </div>

          </div>

        ))}

      </div>

      <input
        type="text"
        value={message}
        placeholder="Ask something..."
        onChange={(e) => setMessage(e.target.value)}
        style={{
          width: "70%",
          marginRight: "10px",
          padding: "8px"
        }}
      />

      <button
        onClick={sendMessage}
        style={{
          padding: "8px 16px",
          cursor: "pointer"
        }}
      >
        Send
      </button>

    </div>
  );
}

export default Chatai;