import { CardCreate, CardHistoryCreate, ContentCreate } from "../../interface";
import { CardModel } from "../../models";
import { log } from '../../utils/log'
import { CardHistoryCreateService, ContentCreateService } from "../";

export class CardCreateService {

    static async createCard(card: CardCreate, content: ContentCreate) {    
        
        try {
            const cardCreate = await new CardModel(card).save();
            
            const cardHistory: CardHistoryCreate = {
                card: cardCreate._id,
                name: card.name,
                status: card.status,
                createdAt: Date.now()
            }
           
            await this.createCardHistory(cardHistory);
            await ContentCreateService.createContent({
                card: cardCreate._id,
                category: content.category,
                description: content.description,
                createdAt: Date.now()
            });
        
            return true;      
        } catch (err) {
            log.error(`Cannot create Card!, ${err}`);
            throw new Error(`Cannot create Card!`);
        }

    }

    static async createCardHistory(cardHistory: CardHistoryCreate) {    
        
        try {
            await CardHistoryCreateService.createCardHistory(cardHistory);
        } catch (err) {
            log.error(`Cannot create Card History!, ${err}`);
            throw new Error(`Cannot create Card History!`);
        }

    }
}