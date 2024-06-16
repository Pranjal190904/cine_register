import StudentModel from "../models/student.model";
import { Request, Response } from "express";
import axios from "axios";
import {RECAPTCHA_SECRET_KEY} from '../config/env.config';

export const registerStudent = async (req: Request, res: Response): Promise<void> => {
    try {
        const {name,studentNumber,branch,gender,residency,email,phone,token} = req.body;
        const {data} = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`);
        if(!data.success || data.score < 0.5){
            res.status(400).json({error:"Invalid Captcha"});
            return ;
        }
        const student = new StudentModel({
            name,
            studentNumber,
            branch,
            gender,
            residency,
            email,
            phone
        });
        await student.save();
        res.status(201).json({message:"Student registered successfully."});
        return ;
    } catch (error) {
        res.status(500).json({message:"Internal server error."});
        return ;
    }
}