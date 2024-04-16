import mongoose, { Document, Schema } from 'mongoose';

interface ITask extends Document {
  title: string;
  completed: boolean;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, required: true, default: false },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Task = mongoose.models.Task || mongoose.model<ITask>("Task", taskSchema);

export default Task;
