/**
 * @swagger
 * components:
 *   schemas:
 *     cardCreate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: card name
 *         emailAddress:
 *           type: string
 *           example: albert@gmail.com
 *         category:
 *           type: string
 *           example: physics
 *         description:
 *           type: string
 *           example: physics is interesting. 
 *     
 *     cardEdit:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: card name
 *         emailAddress:
 *           type: string
 *           example: albert@gmail.com
 *         category:
 *           type: string
 *           example: physics
 *         description:
 *           type: string
 *           example: physics is interesting. 
 * 
 *     cardByIdResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 650db93abd6e5e0a73cca693
 *         name:
 *           type: string
 *           example: card name
 *         status:
 *           type: string
 *           example: NEW
 *         author:
 *           type: string
 *           example: albert@gmail.com
 *         category:
 *           type: string
 *           example: physics
 *         description:
 *           type: string
 *           example: physics is interesting. 
 *         createdAt:
 *           type: date
 *           example: 2023-09-23T15:33:37.463Z. 
 * 
 *     cardsResponse:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *             example: 650db93abd6e5e0a73cca693
 *           name:
 *             type: string
 *             example: card name
 *           status:
 *             type: string
 *             example: NEW
 *           author:
 *             type: string
 *             example: albert@gmail.com
 *           category:
 *             type: string
 *             example: physics
 *           description:
 *             type: string
 *             example: physics is interesting. 
 * 
 *     cardDelete:
 *        type: object
 *        properties:
 *           emailAddress:
 *             type: string
 *             example: albert@gmail.com 
*/
