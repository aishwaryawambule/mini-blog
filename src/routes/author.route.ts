import Router from "koa-router";
import { AuthorController } from '../controllers'

export const authorRouter = new Router();

authorRouter.post('/', AuthorController.createAuthor);