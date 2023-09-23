import logger from 'koa-pino-logger'
import createEcsPinoOptions from '@elastic/ecs-pino-format'

const ecsFormat = createEcsPinoOptions();
export const loggingMiddleware = logger({ ...ecsFormat, autoLogging: false })
export const log = loggingMiddleware.logger