/** @jsxImportSource ai-jsx/react */
"use client";

import { useState } from "react";
import { useAIStream } from "ai-jsx/react";

export default function PlaygroundPage() {
  const DEFAULT_PROMPT = "A red panda who likes to eat grapes";
  const { current, fetchAI } = useAIStream({});
  const [topic, setTopic] = useState(DEFAULT_PROMPT);

  return (
    <div style={{ width: "600px" }}>
      <textarea
        value={topic}
        onChange={(e) => setTopic(e.currentTarget.value)}
        style={{ width: "100%" }}
      />
      <br />
      <input
        type="submit"
        value="Write a poem"
        disabled={topic.trim() === ""}
        onClick={() => {
          fetchAI("/api/playground", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic }),
          });
        }}
      />
      {current && (
        <div
          style={{ width: "100%", whiteSpace: "pre-line", paddingTop: "10px" }}
        >
          {current}
        </div>
      )}
    </div>
  );
}

// <ResultContainer
//   title="Basic Completion"
//   description="In this demo, you can give the AI a topic and it will asynchronously generate a poem as well as a list of facts."
// >
//   <InputPrompt label="Give me a topic..." defaultValue={defaultValue} />
//   <ResultContainer title={`AI writes a poem about "${query}"`}>
//     <AI.jsx>
//       <ChatCompletion temperature={1}>
//         <UserMessage>Write me a poem about {query}</UserMessage>
//       </ChatCompletion>
//     </AI.jsx>
//   </ResultContainer>
//   <ResultContainer title={`AI lists ten facts about "${query}"`}>
//     <AI.jsx>
//       <ChatCompletion temperature={1}>
//         <UserMessage>Give me ten facts about {query}</UserMessage>
//       </ChatCompletion>
//     </AI.jsx>
//   </ResultContainer>
// </ResultContainer>
