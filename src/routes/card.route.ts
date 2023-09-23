import Router from "koa-router";
import { CardController } from '../controllers'
import { CardMiddleware } from "../middlewares/card";

export const cardRouter = new Router();

cardRouter.post('/', CardController.createCard);
cardRouter.put('/:id', CardMiddleware.validateCardById ,CardController.editCard);
cardRouter.delete('/:id', CardMiddleware.validateCardById, CardController.deleteCard);
cardRouter.get('/:id', CardMiddleware.validateCardById, CardController.getCardById);
cardRouter.get('/', CardController.getAllCard);