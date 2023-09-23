import { CardDelete, CardEdit, CardHistoryCreate, ContentEdit } from "../../interface";
import { CardModel } from "../../models";
import { log } from '../../utils/log'
import { CardHistoryCreateService, ContentEditService } from "../";
import { Status } from "../../utils/constants";

export class CardEditService {

    static async editCard(card: CardEdit, content: ContentEdit) {    
        
        try {
            await CardModel.updateOne({ _id: card._id }, {
                $set: {
                    name: card.name,
                    status: card.status,
                    updatedAt: Date.now()
                }
            });
            
            const cardHistory: CardHistoryCreate = {
                card: card._id,
                name: card.name,
                status: card.status,
                createdAt: Date.now()
            }
           
            await CardHistoryCreateService.createCardHistory(cardHistory);

            await ContentEditService.editContent(content);

            return true;      
        } catch (err) {
            log.error(`Cannot edit Card!, ${err}`);
            throw new Error(`Cannot edit Card!`);
        }

    }
    
    static async editCardAsDelete(card: CardDelete) {    
        
        try {
            await CardModel.updateOne({ _id: card._id }, {
                $set: {
                    status: card.status,
                    updatedAt: Date.now(),
                    deletedAt: Date.now()
                }
            });
            
            return true;      
        } catch (err) {
            log.error(`Cannot delete Card!, ${err}`);
            throw new Error(`Cannot delete Card!`);
        }

    }

}