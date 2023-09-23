import Router from 'koa-router';
import { healthCheckRouter } from './health.route';
import { AuthorController, CardController } from '../controllers';
import { authorRouter } from './author.route';
import { cardRouter } from './card.route';


const router = new Router();
// router.prefix('/api')
router.use('/api/health', healthCheckRouter.routes());
router.use('/api/author', authorRouter.routes());
router.use('/api/card', cardRouter.routes());

export default router;
