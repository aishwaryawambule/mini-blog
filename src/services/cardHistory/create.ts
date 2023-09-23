import { CardHistoryCreate } from "../../interface";
import { CardHistoryModel } from "../../models";
import { log } from '../../utils/log'

export class CardHistoryCreateService {

    static async createCardHistory(cardHistory: CardHistoryCreate) {    
        
        try {
            return await new CardHistoryModel(cardHistory).save();      
        } catch (err) {
            log.error(`Cannot create Card history!, ${err}`);
            throw new Error(`Cannot create Card history!`);
        }

    }

}