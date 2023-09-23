import mongoose from "mongoose";
import { CardByAuthor, CardDetailsById } from "../../interface";
import { AuthorModel, CardModel, ContentModel } from "../../models";
import { log } from '../../utils/log'
import { Status } from "../../utils/constants";
import moment from "moment";

export class CardFetchService {

    static async cardById(_id: mongoose.Types.ObjectId) {    
        
        try {
            
            const card = await CardModel.findOne({ _id, status: { $ne: Status.DELETED} });
            if(!card){
               return
            }
            return card;
        } catch (err) {
            log.error(`Invalid Card Id!, ${err}`);
            throw new Error(`Invalid Card Id!`);
        }

    }

    static async cardCreatedByAuthor(card: CardByAuthor) {    
        
        try {

            const cardCreatedByAuthor = await CardModel.findOne({ _id: card.cardId, author: card.authorId });
            if(!cardCreatedByAuthor){
               return false
            }
            return true;
        } catch (err) {
            log.error(`Cannot verify if card is created by author!, ${err}`);
            throw new Error(`Cannot verify if card is created by author!`);
        }

    }

    static async cardDetailsById(card: any) {    
        
        try {
            
            const author = await AuthorModel.findOne({ card: card._id });
            const content = await ContentModel.findOne({ card: card._id });

            const cardDetails: CardDetailsById = {
                id: card._id,
                name: card.name,
                status: card.status,
                author: author?.emailAddress,
                category: content?.category,
                description: content?.description,
                createdAt: moment(Date.now()).format( 'YYYY-MM-DD hh:mm:ss')
            }

            return cardDetails;
        } catch (err) {
            log.error(`Cannot fetch Card by Id!, ${err}`);
            throw new Error(`Cannot fetch Card by Id!`);
        }

    }

    static async cardDetailsByPagination(limit: any, page: any) {    
        
        try {
       
            limit = parseInt(limit, 10)
            page = parseInt(page, 10)

            const searchFilter = { status: { $ne: Status.DELETED } };
            const totalCount = await CardModel.countDocuments(searchFilter);

            // if no data
            if (totalCount === 0) {
                return {
                data: [],
                all: totalCount,
                selected: 0,
                };
            }

          
            const pipeline = [
                {
                    $match: {
                        ...searchFilter
                    },
                },
                {
                  $lookup: {
                    from: 'authors',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'author', // output as
                  },
                },
                {
                  $lookup: {
                    from: 'contents',
                    localField: '_id',
                    foreignField: 'card',
                    as: 'content',  // output as
                  },
                },
                { $skip: limit * (page - 1) },
                { $limit: limit }
              ];

            const aggregateCard = await CardModel.aggregate(pipeline);
            const cardDetails = await this.preProcessCardDetails(aggregateCard);

            return {
                data: cardDetails,
                all: totalCount,
                selected: aggregateCard.length,
            };

        } catch (err) {
            log.error(`Cannot fetch Cards!, ${err}`);
            throw new Error(`Cannot fetch Cards!`);
        }

    }

    static async preProcessCardDetails(details: any[]) {
        const cardDetails: CardDetailsById[] = [];
        await Promise.all(details.map((i) => cardDetails.push({
            id: i._id,
            name: i.name,
            status: i.status,
            author: i.author[0].emailAddress,
            category: i.content[0].category,
            description: i.content[0].description,
            createdAt: moment(i.created_at).format( 'YYYY-MM-DD hh:mm:ss')
        })));
        return cardDetails;
      }
      
}