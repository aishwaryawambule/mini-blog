import { ContentCreate } from "../../interface";
import { ContentModel } from "../../models";
import { log } from '../../utils/log'
import { ContentHistoryCreateService } from "../";

export class ContentCreateService {

    static async createContent(content: ContentCreate) {    
        
        try {
            const contentCreate = await new ContentModel(content).save();
            
            await ContentHistoryCreateService.createContentHistory({
                content: contentCreate._id,
                category: content.category,
                description: content.description
            });
            
        } catch (err) {
            log.error(`Cannot create Content!, ${err}`);
            throw new Error(`Cannot create Content!`);
        }

    }

}