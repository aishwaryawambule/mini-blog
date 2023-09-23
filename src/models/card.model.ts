import { Schema, model } from 'mongoose'
import { Status } from '../utils/constants';

const authorReference = {
    type: Schema.Types.ObjectId,
    ref: 'author',
};

const cardSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: { type: String, required: true, index: true },
    status: {
        type: String,
        enum: [Status.NEW, Status.EDITED, Status.DELETED],
        default: null,
    },
    author: {
        ...authorReference,
        required: true
    },
    created_at: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: '' }
  });
  
export const CardModel = model("Card", cardSchema);
  