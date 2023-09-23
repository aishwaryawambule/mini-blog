import Router from "koa-router";
import { healthCheck } from '../controllers';

export const healthCheckRouter = new Router();

healthCheckRouter.get('/', healthCheck);