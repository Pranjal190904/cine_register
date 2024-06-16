import { Schema, Document, model } from "mongoose";

interface IStudent extends Document {
    name: string,
    studentNumber: string,
    branch: string,
    gender: string,
    residency: string,
    email: string,
    phone: string,
    password: string,
    isVerified: boolean
}

const StudentSchema = new Schema<IStudent>({
    name: { type: String, required: true },
    studentNumber: { type: String, required: true },
    branch: { type: String, required: true},
    gender: { type: String, required: true },
    residency: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String},
    isVerified: { type: Boolean, required: true, default: false }
});

const StudentModel = model<IStudent>('Student', StudentSchema);

export default StudentModel;