import mongoose, { Document, Schema, Model } from 'mongoose';

interface IOption {
  desc: string;
  id: number;
}

interface IQuestion extends Document {
  quesId: number;
  subject: string;
  question: string;
  options: IOption[];
  answer: number;
}

const questionSchema: Schema<IQuestion> = new Schema({
  quesId: { type: Number, required: true },
  subject: { type: String, required: true },
  question: { type: String, required: true },   
  options: [{
      desc: { type: String, required: true },
      id: { type: Number, required: true }
    }],
  answer: { type: Number, required: true }
});

const Question: Model<IQuestion> = mongoose.model<IQuestion>('Question', questionSchema);

export default Question;


// question id { 1 - 50 or 60 } denotes the exact question and its category no need for category 
// options.id { 1 - 4 } denotes the option number
// answer { 1 - 4 } denotes the correct option number