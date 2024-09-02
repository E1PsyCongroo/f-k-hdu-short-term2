const express = require('express')
const router = express.Router()
const routerHandler = require('../router_handler/picture.js');

/**
 * @swagger
 * /pictures:
 *   get:
 *     summary: Get random pictures
 *     description: Retrieves a list of random image URLs from the server.
 *     tags:
 *       - Pictures
 *     responses:
 *       200:
 *         description: A list of random image URLs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 msg:
 *                   type: string
 *                   example: 返回图片成功
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "https://example.com/image1.jpg"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 msg:
 *                   type: string
 *                   example: 服务器错误
 */
router.get('/pictures',routerHandler.getPicture);

module.exports = router;
