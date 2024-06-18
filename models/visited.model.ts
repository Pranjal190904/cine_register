import mongoose, { Document, Schema, Model } from 'mongoose';

interface IVisited extends Document {
  userId: string;
  quesId: number[];
}

const visitedSchema: Schema<IVisited> = new Schema({
  quesId: [{ type: Number, required: true }],
  userId: { type: String, required: true },
});

const Visited: Model<IVisited> = mongoose.model<IVisited>('Visited', visitedSchema);

export default Visited;

// userId denotes mongoose object id of the user
// quesId array of numbers that are visited by the user