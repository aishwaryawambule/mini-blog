// import { SwaggerRouter } from 'koa-swagger-decorator'
// import router from '../routes'
// import { IS_DEV } from '../config'
// import path from 'path'

// extends from koa-router
// export const swaggerRouter = new SwaggerRouter({ prefix: '/api' }, {}) 

// if (IS_DEV) {
//     swaggerRouter.swagger({
//     title: 'Mini Blog Application System',
//     description: 'Doc for Mini Blog Application API',
//     version: '1.0.0',

//     // [optional] default is root path.
//     // if you are using koa-swagger-decorator within nested router, using this param to const swagger know your current router point
//     prefix: '/api',

//     // [optional] default is /swagger-html
//      swaggerHtmlEndpoint: '/swagger-html',
//     // [optional] default is /swagger-json
//     swaggerJsonEndpoint: '/swagger-json',

//     // [optional] additional configuration for config how to show swagger view
//     swaggerConfiguration: {
//       display: {
//         defaultModelsExpandDepth: 4, // The default expansion depth for models (set to -1 compconstely hide the models).
//         defaultModelExpandDepth: 3, // The default expansion depth for the model on the model-example section.
//         docExpansion: 'list', // Controls the default expansion setting for the operations and tags.
//         defaultModelRendering: 'model', // Controls how the model is shown when the API is first rendered.
//       },
//     },
//   })
// }

// swaggerRouter.mapDir("../routes", {});


import swaggerJSDoc from 'swagger-jsdoc'
import { IS_DEV } from '../config'

let options: any = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mini Blog Application API',
      description: 'Doc for Mini Blog Application API',
      version: '1.0.0',
    },
  },
  apis: []
}

if (IS_DEV) {
  options = {
    ...options,
    apis: ['./**/controllers/*.js', './**/controllers/*.ts', './**/swagger/**/*.ts', './**/swagger/**/*.js'],
}
}

export const swaggerSpec: any = swaggerJSDoc(options)

