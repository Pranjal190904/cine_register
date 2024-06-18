import dotenv from 'dotenv';
dotenv.config();

const PORT:string= process.env.PORT || '3000';
const DBURI:string= process.env.DBURI || 'mongodb://localhost:27017/studentdb';
const RECAPTCHA_SECRET_KEY:string|undefined= process.env.RECAPTCHA_SECRET_KEY ;
const EMAIL:string|undefined= process.env.EMAIL;
const PASS:string|undefined= process.env.PASS;
const RECAPTCHA_SECRET_KEY_LOGIN:string|undefined= process.env.RECAPTCHA_SECRET_KEY_LOGIN;

export {PORT,DBURI,RECAPTCHA_SECRET_KEY,EMAIL,PASS, RECAPTCHA_SECRET_KEY_LOGIN};