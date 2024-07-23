import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name:{
     type: String, required: true 
  },
  challenge:{
    type: String, required: true 
  },
  tasks:[{title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  imageUrl: { type: String, required: true },
  id:{ type: String, required: true }}]
});

const Task = mongoose.model('Task', taskSchema)

export default Task;