import { Schema,Document,model } from "mongoose";

interface IToken extends Document{
    studentNumber:string,
    token:string
}

const TokenSchema=new Schema<IToken>({
    studentNumber:{type:String,required:true},
    token:{type:String,required:true}
});

const TokenModel=model<IToken>('Token',TokenSchema);
export default TokenModel;