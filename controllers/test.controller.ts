import { Request, Response } from "express";
import {RECAPTCHA_SECRET_KEY_LOGIN} from '../config/env.config';
import StudentModel from "../models/student.model";
import axios from "axios";  

interface LoginRequest extends Request {
    body: {
        studentNumber: string;
        password: string;
        token: string;
    };
}

export const testController = {
    login: async (req: LoginRequest, res: Response): Promise<Response> => {
        try {
            const { studentNumber, password, token } = req.body;
            const {data} = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY_LOGIN}&response=${token}`);
            if(!data.success || data.score < 0.5){
                return res.status(400).json({error:"Invalid Captcha"});
            }
            const student = await StudentModel.findOneAndUpdate({ studentNumber, password },);

            if (!student) {
                return res.status(400).json({ error: "Invalid student number or password" });
            }
            
            return res.status(200).json({ message: "Login successful." });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error." });
        }
    }
};
