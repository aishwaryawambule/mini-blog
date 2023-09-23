import { Schema, model } from 'mongoose'

const contentReference = {
    type: Schema.Types.ObjectId,
    ref: 'card',
};

const contentHistorySchema = new Schema({
    id: Schema.Types.ObjectId,
    content: {
        ...contentReference,
        required: true
    },
    category: {
        type: String,
        enum: [ "physics", "biology", "finance", "chemistry", "engineering", "health", "sociology", "space", "art"],
        default: null,
    },
    description: { type: String, required: true },
    created_at: { type: Date, default: Date.now() }
  });
  
export const ContentHistoryModel = model("ContentHistory", contentHistorySchema);
  


