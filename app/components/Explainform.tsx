import React, { useState } from "react";
import axios from "axios";
import Link from 'next/link';

const ExplainForm = () => {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [showInput, setShowInput] = useState(true);
  const [fadeAnswer, setFadeAnswer] = useState(false);
  const [displayedQuestion, setDisplayedQuestion] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/anthropic", { name, question });
      setAnswer(response.data.answer);
      setDisplayedQuestion(question);
      setShowInput(false);
      setFadeAnswer(true);
    } catch (err) {
      console.error("Error submitting the question:", err);
    }
  };

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1 className="text-6xl font-bold text-center mb-8 w-full">
        {displayedQuestion || "Explain Like I'm 5"}
      </h1>

      <div className="flex justify-center w-full">
        {showInput && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full max-w-lg min-w-[320px] transition-opacity duration-300 ease-in-out opacity-100"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
              className="p-4 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-white bg-black"
            />

            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question"
              required
              className="p-4 w-full h-32 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-white bg-black"
            />

            <button
              type="submit"
              className="px-6 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              Submit
            </button>
          </form>
        )}

        {fadeAnswer && (
          <div className={`mt-4 p-4 bg-background1 rounded-md fadeInBottom text-center  w-[80%] sm:w-[50%]`}>
            <p className="text-white">{answer}</p>
            <div className= " justify center m-4">
            <Link href="/Explanations">
              <button className="m-4 px-6 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 ">
                Go to Explanations Page
              </button>
            </Link>
            
              <button 
                className="m-4 px-6 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 "
                onClick={() => window.location.reload()}
                >
                Submit another question
              </button>
            
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ExplainForm;
