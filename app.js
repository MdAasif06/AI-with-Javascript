import dotenv from "dotenv";
dotenv.config();
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    messages: [
      {
        role: "system",
        content:
          `You are a smart personal assistent who answers the asked questions.
          You have access to following tools : 
          1. searchWeb({query:string}) //Search the latest information and realtime data on the internet`,
      },
      {
        role: "user",
        content: "when was the iphone 17 launched?",
        // when was the iphone 17 launched?
        // what is the current weather of Mumbai
      },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "webSearch",
          description: "Search the latest information and realtime data on the internet",
          parameters: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "The search query to perform search on",
              },
            },
            required: ["query"],
          },
        },
      },
    ],
    tool_choice:"auto"
  });

  const toolCall=completion.choices[0].message.tool_calls
  if(!toolCall){
    console.log(`Assistent: ${completion.choices[0].message.content}`)
    return;
  }
  for(const tool of toolCall){
    console.log('tool',tool)
    const functionName=tool.function.name
    const functionParams=tool.function.arguments

    if(functionName === 'webSearch'){
      const tooResult= await webSearch(JSON.parse(functionParams))
      console.log("tool Result :",tooResult)
    }
  }



//   console.log(JSON.stringify(completion.choices[0].message,null,2))
}
main();

async function webSearch({ query }) {
  //here we will do travily api call
  console.log("calling the web search...")

  return "iphone was launched on 20 september 2024";
}
