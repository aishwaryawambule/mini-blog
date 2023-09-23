import { AuthorCreate } from "../../interface";
import { AuthorModel } from "../../models";
import { log } from '../../utils/log'

export class AuthorCreateService {

    static async createAuthor(author: AuthorCreate) {    
        
        try {
            return await new AuthorModel(author).save();      
        } catch (err) {
            log.error(`Cannot create Author!, ${err}`);
            throw new Error(`Cannot create Author!`);
        }

    }
}