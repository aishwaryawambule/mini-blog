import Koa from 'koa'
import helmet from 'koa-helmet'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import router from './routes'
import { loggingMiddleware } from './utils/log'
import { swaggerSpec }  from "./swagger"
import { IS_DEV } from './config'
import { koaSwagger } from 'koa2-swagger-ui'

export const app = new Koa()
if (IS_DEV) {
  router.get('/swagger', koaSwagger({ routePrefix: false, swaggerOptions: { spec: swaggerSpec } }))
}

// Provides important security headers to make your app more secure
app.use(helmet({
  contentSecurityPolicy: false
}))

  // Enable cors with default options
  .use(
    cors({
      credentials: true,
      keepHeadersOnError: true,
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowHeaders: [
        'Authorization',
        'Content-Length',
        'Content-Type',
      ],
     }),
    )
  
  // Enable bodyParser with default options
  .use(bodyParser({ enableTypes: ['json', 'form', 'text'] }))
  // .use(swaggerRouter.routes())
  // .use(swaggerRouter.allowedMethods())
  .use(router.routes())
  .use(router.allowedMethods())
  // Logger for application
  .use(loggingMiddleware);


