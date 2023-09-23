import { Context } from 'koa'
import { log } from '../utils/log'
import { CardByAuthor, CardCreate, CardCreateRequest, ContentCreate, CardEditRequest, CardEdit, ContentEdit, CardDeleteRequest } from "../interface";
import { cardCreateValidator, cardDeleteValidator, cardEditValidator } from '../validator';
import { validate } from 'email-validator';
import { AuthorFetchService, CardCreateService, CardEditService } from '../services';
import { Status } from '../utils/constants';
import { CardFetchService } from '../services/card/fetch';
import { CardDeleteService } from '../services/card/delete';



export class CardController {
    /**
    *
    * @param ctx - Koa Context
    *
    * @swagger
    * /api/card:
    *   post:
    *     summary: create card
    *     tags: [Card]
    *     description: Create Card
    *     requestBody:
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/cardCreate'
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
  
    static async createCard(ctx: Context) {    
        log.info("Card Creation process started!");
        const { request } = ctx;
        const body = <CardCreateRequest>request.body;
        const bodyValidator = cardCreateValidator(body);
  
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
  
        const authorExists = await AuthorFetchService.validateAuthorExistsByEmail(body.emailAddress);
        if(!authorExists){
          log.info(`Email Address does not exists!`);
          ctx.status = 400;
          ctx.body = { message: "Invalid Email" };
          return
        }
        
        const cardCreateParams: CardCreate = {
          name: body.name,
          status: Status.NEW,
          author: authorExists._id
        }
  
        const contentCreateParams: ContentCreate = {
          category: body.category,
          description: body.description,
          createdAt: Date.now()
        }
  
        const cardCreateResponse = await CardCreateService.createCard(cardCreateParams, contentCreateParams);
  
        if(cardCreateResponse){
          log.info(`Card created successfully!`);
          }
        
        ctx.status = 200;
        ctx.body = { message: 'Success' };
  
    }

    /**
    *
    * @param ctx - Koa Context
    *
    * @swagger
    * /api/card/{id}:
    *   put:
    *     summary: update card by card Id
    *     tags: [Card]
    *     description: Edit Card
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *           required: true
    *           description: Card Id
    *     requestBody:
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/cardEdit'
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
  
    static async editCard(ctx: Context) {    
      log.info("Card Edit process started!");
      const { request, card } = ctx;
      const body = <CardEditRequest>request.body;
      const bodyValidator = cardEditValidator(body);

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

      const authorExists = await AuthorFetchService.validateAuthorExistsByEmail(body.emailAddress);
      if(!authorExists){
        log.info(`Email Address does not exists!`);
        ctx.status = 401;
        ctx.body = { message: "Author by given email does not exists" };
        return
      }

      const cardByAuthor: CardByAuthor = {
        cardId: card._id,
        authorId: authorExists._id
      }
      
      const cardCreatedByAuthor = await  CardFetchService.cardCreatedByAuthor(cardByAuthor);
      if(!cardCreatedByAuthor){
        log.info(`Cannot Edit! Card is not created by provided author!`);
        ctx.status = 401;
        ctx.body = { message: "Author is not authorized to edit card! Card is not created by this author!" };
        return
      }

      const cardEditParams: CardEdit = {
        _id: card._id,
        name: body.name,
        status: Status.EDITED
      }

      const contentEditParams: ContentEdit = {
        card: card._id,
        category: body.category,
        description: body.description
      }

      const cardEditResponse = await CardEditService.editCard(cardEditParams, contentEditParams);

      if(cardEditResponse){
        log.info(`Card edited successfully!`);
      }
      
      ctx.status = 200;
      ctx.body = { message: 'Success' };

    }


    /**
     *
     * @param ctx - Koa Context
     *
     * @swagger
     * /api/card/{id}:
     *   delete:
     *     summary: delete card by card Id
     *     tags: [Card]
     *     description: Delete Card
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *           required: true
     *           description: Card Id
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/cardDelete'
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
  
    static async deleteCard(ctx: Context) {    
      log.info("Card Delete process started!");
      const { request, card } = ctx;

      const body = <CardDeleteRequest>request.body;

      const bodyValidator = cardDeleteValidator(body);

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

      const authorExists = await AuthorFetchService.validateAuthorExistsByEmail(body.emailAddress);
      if(!authorExists){
        log.info(`Email Address does not exists!`);
        ctx.status = 401;
        ctx.body = { message: "Author by given email does not exists" };
        return
      }

      const cardByAuthor: CardByAuthor = {
        cardId: card._id,
        authorId: authorExists._id
      }
      
      const cardCreatedByAuthor = await  CardFetchService.cardCreatedByAuthor(cardByAuthor);
      if(!cardCreatedByAuthor){
        log.info(`Cannot Delete! Card is not created by provided author!`);
        ctx.status = 401;
        ctx.body = { message: "Author is not authorized to delete card! Card is not created by this author!" };
        return
      }

      const cardDeleteResponse = await CardDeleteService.deleteCard(card);

      if(cardDeleteResponse){
        log.info(`Card deleted successfully!`);
      }
      
      ctx.status = 200;
      ctx.body = { message: 'Success' };

    }


    /**
     *
     * @param ctx - Koa Context
     *
     * @swagger
     * /api/card/{id}:
     *   get:
     *     summary: fetch card details by card Id
     *     tags: [Card]
     *     description: Get Card by Id
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *           required: true
     *           description: Card Id
     *     responses:
     *       200:
     *         description: Returns success msg
     *         content:
     *           application/json:
     *             schema:
     *              $ref: '#/components/schemas/cardByIdResponse'
     *
     */
  
    static async getCardById(ctx: Context) {    
      log.info("Fetcing card by Id!");
      const { card } = ctx;

      const cardByIdResponse = await CardFetchService.cardDetailsById(card);

      if(cardByIdResponse){
        log.info(`Card by Id fetched successfully!`)
      }
      
      ctx.status = 200;
      ctx.body = cardByIdResponse;

    }
    

    /**
     *
     * @param ctx - Koa Context
     *
     * @swagger
     * /api/card:
     *   get:
     *     summary: fetch all card details by pagination limitation
     *     tags: [Card]
     *     description: Get Cards
     *     parameters:
     *       - in: query
     *         name: limit
     *         schema:
     *           type: number
     *         required: true
     *         description: Limit
     *       - in: query
     *         name: page
     *         schema:
     *           type: number
     *         required: true
     *         description: Page
     *     responses:
     *       200:
     *         description: Returns success msg
     *         content:
     *           application/json:
     *             schema:
     *              $ref: '#/components/schemas/cardsResponse'
     *
     */
  
    static async getAllCard(ctx: Context) {    
      log.info("Fetcing cards based on pagination!");
      let { limit, page } = ctx.request.query as any
      
      const cardByIdResponse = await CardFetchService.cardDetailsByPagination( limit, page );

      if(cardByIdResponse){
        log.info(`Card by Id fetched successfully!`)
      }
      
      ctx.status = 200;
      ctx.body = cardByIdResponse;

    }
}
