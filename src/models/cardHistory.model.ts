import { Schema, model } from 'mongoose'
import { Status } from '../utils/constants';

const cardReference = {
    type: Schema.Types.ObjectId,
    ref: 'card',
};

const cardHistorySchema = new Schema({
    id: Schema.Types.ObjectId,
    card: {
        ...cardReference,
        required: true
    },
    name: { type: String, required: true, index: true },
    status: {
        type: String,
        enum: [Status.NEW, Status.EDITED, Status.DELETED],
        default: null,
    },
    created_at: { type: Date, default: Date.now() }
  });
  
export const CardHistoryModel = model("CardHistory", cardHistorySchema);
  