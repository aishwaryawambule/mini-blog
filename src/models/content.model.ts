import { Schema, model } from 'mongoose'

const cardReference = {
    type: Schema.Types.ObjectId,
    ref: 'card',
};

const contentSchema = new Schema({
    id: Schema.Types.ObjectId,
    card: {
        ...cardReference,
        required: true
    },
    category: {
        type: String,
        enum: [ "physics", "biology", "finance", "chemistry", "engineering", "health", "sociology", "space", "art"],
        default: null,
    },
    description: { type: String, required: true },
    created_at: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
  });
  
export const ContentModel = model("Content", contentSchema);
  


