import mongoose, { Document, Schema, Model } from 'mongoose';

interface IResponse extends Document {
  quesId: number;
  response: number;
  userId: string;
  ansId: number;
}

const responseSchema: Schema<IResponse> = new Schema({
  quesId: { type: Number, required: true },
  response: { type: Number, required: true },
  userId: { type: String, required: true },
  ansId: { type: Number, required: true },
});

const Response: Model<IResponse> = mongoose.model<IResponse>('Response', responseSchema);

export default Response;

// question id { 1 - 50 or 60 } denotes the exact question and its category no need for category
// response { 1 - 3 }, 1 - attempted , 2 - attempted and marked for review , 3 - not attempted
// userId denotes mongoose object id of the user
// ansId { 1 - 4 } denotes the ans given by the user