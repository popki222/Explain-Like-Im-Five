import React, { useState } from "react";
import axios from 'axios';

const ExplainForm = () => {
    const [name, setName] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('/api/anthropic', { name, question });
          setAnswer(response.data.answer);
          console.log(answer)
        } catch (err) {
          console.error("Error submitting the question:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-lg">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                required
                className="p-4 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />

            <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your question"
                required
                className="p-4 w-full h-32 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />

            <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Submit
            </button>
            {answer && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <p className="text-black">{answer}</p>
        </div>
      )}
        </form>
    );
};

export default ExplainForm;
