import mongoose, {Schema} from 'mongoose';



const todoSchema = new Schema({
    title:{
        type:String,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    }, 
    user:{
        type:Schema.Types.ObjectId, 
        ref:'User'
    }
})


export const Todo = mongoose.model('Todo', todoSchema);