import { Schema, model } from 'mongoose'

const authorSchema = new Schema({
    id: Schema.Types.ObjectId,
    userName: { type: String, required: true, index: true },
    emailAddress: { type: String, required: true, index: { unique: true} },
    created_at: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: '' }
  });
  
export const AuthorModel = model("author", authorSchema);
  