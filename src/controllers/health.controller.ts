import { Context } from 'koa'

/**
 * @openapi
 * /api/health:
 *   get:
 *     summary: provides health status of server
 *     tags: [Health]
 *     description: Check Status Of Api Server
 *     responses:
 *       200:
 *         description: Returns a health status of server.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 status:
 *                   type: string
 *                   example: healthy
 *
 */
export async function healthCheck(ctx: Context) {
  const { response } = ctx;
  response.status = 200;
  response.body = { status: 'healthy' };
}
