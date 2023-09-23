import { Context } from 'koa'
import { log } from '../utils/log'
import { AuthorCreate } from "../interface";
import { authorCreateValidator } from '../validator';
import { validate } from 'email-validator';
import { AuthorCreateService } from '../services';


export class AuthorController {
  /**
   *
   * @param ctx - Koa Context
   *
   * @swagger
   * /api/author:
   *   post:
   *     summary: create author
   *     tags: [Author]
   *     description: Create Author
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/authorCreate'
   *     responses:
   *       200:
   *         description: Returns success msg
   *         content:
   *           application/json:
  *             schema:
   *               type: object
   *               properties:
   *                 msg:
   *                   type: string
   *                   example: success
   *
   */
  
  static async createAuthor(ctx: Context) {    
      log.info("Author Creation process started!");
      const { request } = ctx;
      const body = <AuthorCreate>request.body;
      const bodyValidator = authorCreateValidator(body);
      console.log('bodyValidator', JSON.stringify(body))
      if (bodyValidator !== true) {
        log.info(`Request body validation failed!`);
        ctx.status = 400;
        ctx.body = bodyValidator;
        return
      }

      if(!validate(body.emailAddress)){
        log.info(`Email Address validation failed!`);
        ctx.status = 400;
        ctx.body = { message: "Invalid Email" };
        return
      }
      
      const response = await AuthorCreateService.createAuthor(body);

      if(response){
        log.info(`Author created successfully!`);
      }

      ctx.status = 200;
      ctx.body = { message: 'Success' };

  }
}
