import mongoose from "mongoose";
import { ContentModel } from "../../models";
import { log } from '../../utils/log'

export class ContentFetchService {

    static async contentByCardId(cardId: mongoose.Types.ObjectId) {    
        
        try {
            
            const content = await ContentModel.findOne({ card: cardId });
            if(!content){
               return
            }
            return content;
        } catch (err) {
            log.error(`Invalid Content Card Id!, ${err}`);
            throw new Error(`Invalid Content Card Id!`);
        }

    }
    
}