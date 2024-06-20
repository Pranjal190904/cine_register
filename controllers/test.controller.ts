import { Request, Response } from "express";
import { RECAPTCHA_SECRET_KEY_LOGIN } from '../config/env.config';
import Student from "../models/student.model";
import axios from "axios";  
import Token from '../middleware/token.middleware'
import Activity from '../models/activity.model'

interface LoginRequest extends Request {
    body: {
        studentNumber: string;
        password: string;
        token: string;
    };
}

interface AuthenticatedRequest extends Request {
    userId?: string;
    body : {
        programmingLanguage : string; 
    }
}

export const testController = {
    login: async (req: LoginRequest, res: Response): Promise<Response> => {
        try {
            const { studentNumber, password, token } = req.body;

            // const {data} = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY_LOGIN}&response=${token}`);
            // if (!data.success || data.score < 0.5) {
            //     return res.status(400).json({ error: "Invalid Captcha" });
            // }

            const student = await Student.findOne({ studentNumber, password });

            if (!student) {
                return res.status(400).json({ error: "Invalid student number or password" });
            }

            const accessToken = await Token.signAccessToken(student.id);
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });

            return res.status(200).json({ message: "Login successful." });
        } catch (error) {
            console.error(error); 
            return res.status(500).json({ message: "Internal server error." });
        }
    },
    start : async (req : AuthenticatedRequest, res : Response ): Promise<Response> => {
        try {
            const { programmingLanguage } = req.body ; 
            const userId = req.userId ; 
            if (!programmingLanguage) {
                return res.status(400).json({ message: 'Programming language is required' });
            }
            const firstLogin = new Date() ; 
            const startTime = firstLogin ; 
            const setNumber = Math.floor(Math.random() * 10) + 1;
            const newActivity = new Activity({
                userId,
                firstLogin,
                programmingLanguage,
                setNumber,
                startTime
            });
    
            await newActivity.save();
    
            return res.status(200).json({ message : "Cine has started"});
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message : "Internal Server Error"}); 
            
        }
    }
};