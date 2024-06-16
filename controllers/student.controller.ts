import StudentModel from "../models/student.model";
import TokenModel from "../models/token.model";
import crypto from "crypto";
import { Request, Response } from "express";
import axios from "axios";
import {RECAPTCHA_SECRET_KEY} from '../config/env.config';
import {sendMail,sendPassword} from "../utils/mailer";

export const registerStudent = async (req: Request, res: Response): Promise<void> => {
    try {
        const {name,studentNumber,branch,gender,residency,email,phone,token} = req.body;
        const {data} = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`);
        if(!data.success || data.score < 0.5){
            res.status(400).json({error:"Invalid Captcha"});
            return ;
        }
        const studentExists = await StudentModel.findOne({studentNumber});
        if(studentExists){
            res.status(400).json({message:"Student already exists."});
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
        const verificationToken:string= crypto.randomBytes(32).toString('hex');
        const tokenModel = new TokenModel({
            studentNumber,
            token:verificationToken
        });
        await tokenModel.save();
        const link:string=`https://cineregister.onrender.com/student/verify?token=${verificationToken}`;
        await sendMail(email,link);
        res.status(201).json({message:"Student registered successfully."});
        return ;
    } catch (error) {
        res.status(500).json({message:"Internal server error."});
        return ;
    }
}

export const verifyStudent = async (req: Request, res: Response): Promise<void> => {
    try {
        const {token} = req.query;
        if(!token){
            res.status(400).json({message:"Invalid token."});
            return ;
        }
        const tokenExists = await TokenModel.findOne({token});
        if(!tokenExists){
            res.status(400).json({message:"Invalid token."});
            return ;
        }
        const password:string= crypto.randomBytes(8).toString('hex');
        const student = await StudentModel.findOneAndUpdate({studentNumber:tokenExists.studentNumber},{password,isVerified:true},{upsert:true});
        if(!student){
            res.status(400).json({message:"Student not found."});
            return ;
        }
        await sendPassword(student.email,student.studentNumber,password);
        res.send(`<h1>Student verified successfully.</h1><h2>Login credentials sent to your registered email.</h2>`);
        return ;
    } catch (error) {
        res.status(500).json({message:"Internal server error."});
        return ;
    }
}
