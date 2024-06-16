import {connect} from 'mongoose';
import {DBURI} from '../config/env.config';

const connectDb=async():Promise<void>=>{
    try{
        await connect(DBURI);
        console.log("db connected.");
    }
    catch(err){
        console.log({error:err});
    }
}

export default connectDb;