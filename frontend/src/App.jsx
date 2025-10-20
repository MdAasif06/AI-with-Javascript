import { useState } from "react";

const App = () => {


  const [taskData, setTaskData] = useState('');
  const [displayText, setDisplayText] = useState([]);


// add user message
  const handleSubmit = (e) => {
    e.preventDefault(); // Stops page refresh
    if(taskData.trim() === "") return;

    const userMessage={text:taskData,sender:"user"};
    setDisplayText(prev=>[...prev,userMessage]); // Move input to display area
    setTaskData(''); // Clear input field
  };

  return (
    <div className="bg-neutral-900 text-white h-screen overflow-x-hidden">
      <div className="container mx-auto max-w-3xl pb-34 px-3">
        {/* message goes here  */}

        {/* user message  */}
        
        <div className="w-full max-w-2xl flex flex-col">
         {displayText.map((msg,index)=>(
             <div key={index}
              className={`max-w-[75%] p-2 my-1 rounded-lg text-base leading-relaxed break-words shadow-md ${
                msg.sender === 'user'
                  ? 'bg-gray-700 ml-auto' // Right aligned (user)
                  : 'bg-gray-700 mr-auto rounded-bl-none' // Left aligned (bot)
              }`}
            >
             {msg.text}
            </div>
         ))}
        </div>
        

        {/* assistent message here */}
        <div className="bg-neutral-800 p-3 mb-3 rounded-lg max-w-fit">
          Hello! How can I assist you today?
        </div>

         
        
         

        {/* Bottom textarea goes here  */}
        <form onSubmit={handleSubmit} className="fixed inset-x-0 bottom-0 flex items-center justify-center bg-neutral-900">
          <div className="bg-neutral-700 rounded-lg p-2 w-full max-w-3xl mb-15 ">
          <textarea value={taskData}
           onChange={(e)=>setTaskData(e.target.value)} onKeyDown={(e)=>e.key === 'Enter' && handleSubmit(e)}
           rows={1} className="w-full px-3 outline-none resize-none" placeholder="Ask anything if you want ?"></textarea>
          <div className="flex justify-end items-center">
            <button className="bg-white hover:bg-gray-400 text-black px-3 py-1.5 rounded-xl font-semibold">ask</button>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default App;
