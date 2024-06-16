import { Request, Response } from "express";
import StudentModel from "../models/student.model";

interface LoginRequest extends Request {
    body: {
        studentNumber: string;
        password: string;
    };
}

export const testController = {
    login: async (req: LoginRequest, res: Response): Promise<Response> => {
        try {
            const { studentNumber, password } = req.body;
            const student = await StudentModel.findOne({ studentNumber, password });
            
            if (!student) {
                return res.status(400).json({ error: "Invalid student number or password" });
            }
            
            return res.status(200).json({ message: "Login successful." });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error." });
        }
    }
};
