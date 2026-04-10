"use client";

import { useState } from "react";

type Message = {
  sender: "user" | "bot";
  text: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hi! I can help you book a table." },
  ]);

  const getBotReply = (userText: string): string => {
    const text = userText.toLowerCase();
    if (text.includes("book")){
        return "How many people you want to reserve?"
    }
    if (text.includes("time") || text.includes("today")) {
        return "We have availability at 6 PM and 7PM.";
    }
    if(text.includes("cancel")){
        return " Please provide your name and reservation time to cancel."

    }
    if(text.includes("hello") || text.includes("hi")) {
        return "Hello! I can help you book a table.";
    }
    return "I can help you book, cancel, or check the availability"
  }
  const sendMessage = () => {
    if (!input.trim()) return;
    const userText = input.trim()
    const userMsg: Message = { sender: "user", text: input };
    const botMsg: Message = {
      sender: "bot",
      text: getBotReply(userText),
    };

    setMessages((prev) => [...prev, userMsg, botMsg])
    setInput("");
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 rounded-full bg-orange-600 px-5 py-4 text-white shadow-lg"
        >
          Chat
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 w-80 h-[400px] bg-white border rounded-xl shadow-xl flex flex-col">
          <div className="bg-orange-600 text-white p-3 flex justify-between">
            <span>TableBot</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${
                  msg.sender === "user"
                    ? "text-right"
                    : "text-left text-gray-700"
                }`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-orange-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          <div className="p-2 border-t flex">
            <input
              className="flex-1 border rounded px-2 py-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type..."
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-orange-600 text-white px-3 rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}