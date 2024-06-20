import mongoose, { Document, Schema, Model, model } from 'mongoose';

interface IActivity extends Document {
    userId: string;
    firstLogin: Date;
    programmingLanguage: string;
    setNumber: number;
    startTime: Date;
}

const activitySchema: Schema<IActivity> = new Schema({
    userId: { type: String, required: true },
    firstLogin: { type: Date, required: true },
    programmingLanguage: { type: String, required: true },
    setNumber: { type: Number, required: true },
    startTime: { type: Date, required: true }
});

const Activity: Model<IActivity> = model<IActivity>('Activity', activitySchema);

export default Activity;
