import { useState } from "react";
import axios from "axios";

const App = () => {
  const [taskData, setTaskData] = useState("");
  const [displayText, setDisplayText] = useState([]);

  // ✅ Server Call using Axios
  const callServer = async (inputText) => {
    try {
      const response = await axios.post("http://localhost:8080/chat", {
        message: inputText, // Axios automatically converts to JSON
      });

      console.log("Server Response:", response.data);
      return response.data.reply || response.data.message; // Backend ka key check karo
    } catch (error) {
      console.error(error);
      return "Server is not responding!";
    }
  };

  // ✅ Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskData.trim() === "") return;

    // Add user message
    setDisplayText((prev) => [...prev, { text: taskData, sender: "user" }]);

    // Call backend with Axios
    const assistantMessage = await callServer(taskData);

    // Clear input field
    setTaskData("");

    // Show assistant/bot message
    if (assistantMessage) {
      setDisplayText((prev) => [...prev,
        { text: assistantMessage, sender: "bot" },
      ]);
    }
  };

  return (
    <div className="bg-neutral-900 text-white h-screen overflow-x-hidden">
      <div className="container mx-auto max-w-3xl pb-34 px-3">
        
        {/* Chat Display */}
        <div className="w-full max-w-2xl flex flex-col mt-5">
          {displayText.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[75%] p-2 my-1 rounded-lg text-base leading-relaxed break-words shadow-md ${
                msg.sender === "user"
                  ? "bg-gray-700 ml-auto" // Right side (user)
                  : "bg-gray-700 mr-auto rounded-bl-none" // Left side (bot)
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Bottom Input */}
        <form onSubmit={handleSubmit}
          className="fixed inset-x-0 bottom-0 flex items-center justify-center bg-neutral-900"
        >
          <div className="bg-neutral-700 rounded-lg p-2 w-full max-w-3xl mb-15 ">
            <textarea
              value={taskData}
              onChange={(e) => setTaskData(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmit(e)}
              rows={1}
              className="w-full px-3 outline-none resize-none"
              placeholder="Ask anything if you want ?"
            ></textarea>
            <div className="flex justify-end items-center">
              <button className="bg-white hover:bg-gray-400 text-black px-3 py-1.5 rounded-xl font-semibold">
                ask
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
