import mongoose from 'mongoose';

// Define the schema for questions
const QuestionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Export the model
const QuestionModel = mongoose.models.Question || mongoose.model('Question', QuestionSchema);
export default QuestionModel;
