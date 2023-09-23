import { CardModel } from "../../models";
import { log } from '../../utils/log'
import { CardDelete, CardHistoryCreate } from "../../interface";
import { CardHistoryCreateService } from "../cardHistory/create";
import { Status } from "../../utils/constants";
import { CardEditService } from "./edit";

export class CardDeleteService {

    static async deleteCard(card: any) {    
        
        try {

            const cardDelete: CardDelete = {
                _id: card._id,
                status: Status.DELETED
            }
            await CardEditService.editCardAsDelete(cardDelete);

            const cardHistory: CardHistoryCreate = {
                card: card._id,
                name: card.name,
                status: cardDelete.status,
                createdAt: Date.now()
            }
           
            await CardHistoryCreateService.createCardHistory(cardHistory);

            return true;      
        } catch (err) {
            log.error(`Cannot delete Card!, ${err}`);
            throw new Error(`Cannot delete Card!`);
        }

    }

}