import mongoose from "mongoose";


const authSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
        },
        password:{
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber:{
            type: String,
            required: true,
            unique: true
        },
        ismobileverified:{
            type: Boolean,
            required: true
        }
    }, {timestamps:true}
);

const Auth = mongoose.model('Auth', authSchema)

export default Auth;