import { AuthorModel } from "../../models";
import { log } from '../../utils/log'

export class AuthorFetchService {

    static async validateAuthorExistsByEmail(emailAddress: string) {    
        
        try {
            const author = await AuthorModel.findOne({emailAddress});
            if(!author){
               return
            }
            return author;
        } catch (err) {
            log.error(`Cannot validate Author!, ${err}`);
            throw new Error(`Cannot validate Author!`);
        }

    }
}