import mongoose, {Schema} from 'mongoose';


const userSchema = new Schema({
    fullName:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true,
    },
    password:{
        type:String,
    },
    token:{
        type:String,
    },
   todos: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Todo'
    }]
})

userSchema.index({email:1})

export const User = mongoose.model('User', userSchema);