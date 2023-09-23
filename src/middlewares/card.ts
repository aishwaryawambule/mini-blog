import { Context } from 'koa'
import { objectIdValidator } from '../validator';
import { log } from '../utils/log';
import { CardFetchService } from '../services/card/fetch';

export class CardMiddleware {

  static async validateCardById(ctx: Context, next: Function) {
    const cardId = ctx.params.id;
    const paramValidator = objectIdValidator(cardId);

    if (paramValidator !== true) {
      log.info(`CardId validation failed!`);
      ctx.status = 400;
      ctx.body = paramValidator;
      return
    }

    const cardExists = await CardFetchService.cardById(cardId);
      if(!cardExists){
        log.info(`Card does not exists!`);
        ctx.status = 401;
        ctx.body = { message: "Card does not exists!" };
        return
      }
    
    ctx.card = cardExists;

    await next();
  }
}
