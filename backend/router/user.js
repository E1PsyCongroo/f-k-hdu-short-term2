const express = require('express');
const router = express.Router();
const routerHandler = require('../router_handler/user.js');

//router.post('/register',routerHandler.regUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Logs in a user with their username and password, and returns a JWT token.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 example: mypassword123
 *     responses:
 *       200:
 *         description: Successful login, returns JWT token.
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
 *                   example: 登录成功
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     username:
 *                       type: string
 *                       example: john_doe
 *                     member_id:
 *                       type: integer
 *                       example: 123
 *                     avatar:
 *                       type: string
 *                       example: "https://example.com/avatar.png"
 *       500:
 *         description: Error response, when username or password is incorrect.
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
 *                   example: 用户名或密码错误
 */
router.post('/login',routerHandler.login);


module.exports = router;
