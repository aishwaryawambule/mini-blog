import { ContentHistoryCreate } from "../../interface";
import { ContentHistoryModel } from "../../models";
import { log } from '../../utils/log'

export class ContentHistoryCreateService {

    static async createContentHistory(contentHistory: ContentHistoryCreate) {    
        
        try {
            return await new ContentHistoryModel(contentHistory).save();      
        } catch (err) {
            log.error(`Cannot create Content history!, ${err}`);
            throw new Error(`Cannot create Content history!`);
        }

    }

}