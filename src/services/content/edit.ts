import { ContentEdit } from "../../interface";
import { log } from '../../utils/log'
import { ContentHistoryCreateService } from "../";
import { ContentModel } from "../../models";

export class ContentEditService {

    static async editContent(content: ContentEdit) {    
        
        try {

            const contentById = await ContentModel.findOne({ card: content.card });

            await ContentModel.updateOne({ _id: contentById?._id }, {
                $set: {
                    category: content.category,
                    description: content.description,
                    updatedAt: Date.now()
                }
            });
            
            await ContentHistoryCreateService.createContentHistory({
                    content: contentById?._id,
                    category: content.category,
                    description: content.description
            });

        } catch (err) {
            log.error(`Cannot edit Content!, ${err}`);
            throw new Error(`Cannot edit Content!`);
        }

    }

}