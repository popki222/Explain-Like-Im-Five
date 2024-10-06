import dbConnect from '@/utils/dbConnect';
import QuestionModel from '@/models/Question';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, question } = req.body;

    try {
      await dbConnect();

      const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1024,
        system: "A five year old is asking you a question and you must respond in a way they will understand",
        messages: [{ role: "user", content: question }],
      });

      const responseText = msg?.content[0]?.text || "No response available.";

      const newQuestion = new QuestionModel({ name, question, response: responseText });
      await newQuestion.save();

      res.status(200).json({ answer: responseText });
    } catch (error) {
      console.error("Error saving the data:", error);
      res.status(500).json({ message: 'Error saving the question and response' });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
