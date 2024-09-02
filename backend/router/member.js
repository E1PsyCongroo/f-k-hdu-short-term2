const express = require('express');
const router = express.Router();
const routerHandler = require('../router_handler/member.js');

/**
 * @swagger
 * /family:
 *   get:
 *     summary: Get the family of a member
 *     description: Retrieves the family information for a specific member.
 *     tags:
 *       - Family
 *     parameters:
 *       - in: query
 *         name: member_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the member whose family information is to be retrieved.
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved family information.
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
 *                   example: 获取家庭成功
 *                 data:
 *                   type: object
 *                   properties:
 *                     family_id:
 *                       type: integer
 *                       example: 1
 *                     family_name:
 *                       type: string
 *                       example: "Doe Family"
 *       500:
 *         description: Error retrieving family information.
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
router.get('/family', routerHandler.getFamily)

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Get all members of a family
 *     description: Retrieves all members of the family to which a specific member belongs.
 *     tags:
 *       - Members
 *     parameters:
 *       - in: query
 *         name: member_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the member whose family's members are to be retrieved.
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved all members.
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
 *                   example: 获取所有成员成功
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       member_id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       sex:
 *                         type: string
 *                         example: "Male"
 *                       relation:
 *                         type: string
 *                         example: "Father"
 *       500:
 *         description: Error retrieving members.
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
router.get('/members',routerHandler.getMembers);

/**
 * @swagger
 * /members:
 *   post:
 *     summary: Add a new family member
 *     description: Adds a new member to the family.
 *     tags:
 *       - Members
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - sex
 *               - relation
 *               - family_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *               sex:
 *                 type: string
 *                 example: "Female"
 *               relation:
 *                 type: string
 *                 example: "Mother"
 *               family_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully added a new member.
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
 *                   example: 新增用户成功
 *       500:
 *         description: Error adding the member.
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
router.post('/members',routerHandler.addMember);

/**
 * @swagger
 * /members/{member_id}:
 *   put:
 *     summary: Update a member's information
 *     description: Updates the information of an existing member in the database by their member ID.
 *     tags:
 *       - Members
 *     parameters:
 *       - in: path
 *         name: member_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the member to update.
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - sex
 *               - relation
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the member.
 *                 example: John Doe
 *               sex:
 *                 type: string
 *                 description: The gender of the member.
 *                 example: Male
 *               relation:
 *                 type: string
 *                 description: The relation of the member to the head of the family.
 *                 example: Son
 *     responses:
 *       200:
 *         description: Successfully updated the member's information.
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
 *                   example: 修改成员成功
 *       500:
 *         description: Error updating the member's information.
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
router.put('/members/:member_id', routerHandler.alterMember);

/**
 * @swagger
 * /members/{member_id}:
 *   delete:
 *     summary: Delete a member by ID
 *     description: Deletes a member from the database by their member ID.
 *     tags:
 *       - Members
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the member to delete.
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully deleted the member.
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
 *                   example: 删除成员成功
 *       500:
 *         description: Error deleting the member.
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
router.delete('/members/:member_id', routerHandler.deleteMember);

module.exports = router;
