const express = require('express');
const router = express.Router();
const routerHandler = require('../router_handler/consume.js');

/**
 * @swagger
 * /consumes:
 *   post:
 *     summary: Add a new consume record
 *     description: Adds a new consume record (income or outcome) for a member.
 *     tags:
 *       - Consumes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - member_id
 *               - amount
 *               - transactionType
 *               - consumeDate
 *             properties:
 *               member_id:
 *                 type: integer
 *                 example: 1
 *               amount:
 *                 type: number
 *                 example: 100.50
 *               transactionType:
 *                 type: integer
 *                 example: 0
 *               consumeDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-09-01"
 *               recipient:
 *                 type: string
 *                 example: "Grocery Store"
 *               category:
 *                 type: string
 *                 example: "Food"
 *               userNote:
 *                 type: string
 *                 example: "Weekly grocery shopping"
 *               isDeleted:
 *                 type: integer
 *                 example: 0
 *     responses:
 *       200:
 *         description: Successfully added the consume record.
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
 *                   example: 新增成功
 *       500:
 *         description: Error adding the consume record.
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
router.post('/consumes',routerHandler.addConsume);

/**
 * @swagger
 * /consumes/{id}:
 *   put:
 *     summary: Update a consume record by ID
 *     description: Updates a specific consume record by its ID.
 *     tags:
 *       - Consumes
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the consume record to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               member_id:
 *                 type: integer
 *                 example: 1
 *               amount:
 *                 type: number
 *                 example: 100.50
 *               transactionType:
 *                 type: integer
 *                 example: 0
 *               consumeDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-09-01"
 *               recipient:
 *                 type: string
 *                 example: "Grocery Store"
 *               category:
 *                 type: string
 *                 example: "Food"
 *               userNote:
 *                 type: string
 *                 example: "Weekly grocery shopping"
 *     responses:
 *       200:
 *         description: Successfully updated the consume record.
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
 *                   example: 修改消费记录成功
 *       500:
 *         description: Error updating the consume record.
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
router.put('/consumes/:id', routerHandler.alterConsumeById);

/**
 * @swagger
 * /consumes/{id}:
 *   delete:
 *     summary: Delete a consume record by ID
 *     description: Marks a consume record as deleted by setting isDeleted to 1.
 *     tags:
 *       - Consumes
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the consume record to delete.
 *     responses:
 *       200:
 *         description: Successfully deleted the consume record.
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
 *                   example: 删除消费记录成功
 *       500:
 *         description: Error deleting the consume record.
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
router.delete('/consumes/:id',routerHandler.deleteConsumeById);

/**
 * @swagger
 * /consumes:
 *   get:
 *     summary: Get all consume records
 *     description: Retrieves all consume records for a family.
 *     tags:
 *       - Consumes
 *     parameters:
 *       - in: query
 *         name: family_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the family to retrieve consume records for.
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved all consume records.
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
 *                   example: 获取所有消费记录成功
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       member_id:
 *                         type: integer
 *                         example: 1
 *                       memberName:
 *                         type: string
 *                         example: "John Doe"
 *                       amount:
 *                         type: number
 *                         example: 100.50
 *                       transactionType:
 *                         type: integer
 *                         example: 0
 *                       consumeDate:
 *                         type: string
 *                         format: date
 *                         example: "2024-09-01"
 *                       recipient:
 *                         type: string
 *                         example: "Grocery Store"
 *                       category:
 *                         type: string
 *                         example: "Food"
 *                       isDeleted:
 *                         type: integer
 *                         example: 0
 *                       userNote:
 *                         type: string
 *                         example: "Weekly grocery shopping"
 *       500:
 *         description: Error retrieving consume records.
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
router.get('/consumes',routerHandler.getAllConsumes);

/**
 * @swagger
 * /consumes/member/{id}:
 *   get:
 *     summary: Get consume records by member ID
 *     description: Retrieves all consume records associated with a specific member.
 *     tags:
 *       - Consumes
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the member whose consume records are to be retrieved.
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved consume records.
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
 *                   example: 根据member_id获取数据成功
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       member_id:
 *                         type: integer
 *                         example: 1
 *                       memberName:
 *                         type: string
 *                         example: "John Doe"
 *                       amount:
 *                         type: number
 *                         example: 100.50
 *                       transactionType:
 *                         type: integer
 *                         example: 0
 *                       consumeDate:
 *                         type: string
 *                         format: date
 *                         example: "2024-09-01"
 *                       recipient:
 *                         type: string
 *                         example: "Grocery Store"
 *                       category:
 *                         type: string
 *                         example: "Food"
 *                       isDeleted:
 *                         type: integer
 *                         example: 0
 *                       userNote:
 *                         type: string
 *                         example: "Weekly grocery shopping"
 *       500:
 *         description: Error retrieving consume records.
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
router.get('/consumes/member/:id',routerHandler.getConsumeByMemId);

/**
 * @swagger
 * /consumes/outcome:
 *   get:
 *     summary: Get all outcome records
 *     description: Retrieves all outcome records (expenses) for a specific family.
 *     tags:
 *       - Consumes
 *     parameters:
 *       - in: query
 *         name: family_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the family to retrieve outcome records for.
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved all outcome records.
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
 *                   example: 获取所有支出记录成功
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       member_id:
 *                         type: integer
 *                         example: 1
 *                       memberName:
 *                         type: string
 *                         example: "John Doe"
 *                       amount:
 *                         type: number
 *                         example: 100.50
 *                       transactionType:
 *                         type: integer
 *                         example: 0
 *                       consumeDate:
 *                         type: string
 *                         format: date
 *                         example: "2024-09-01"
 *                       recipient:
 *                         type: string
 *                         example: "Grocery Store"
 *                       category:
 *                         type: string
 *                         example: "Food"
 *                       userNote:
 *                         type: string
 *                         example: "Weekly grocery shopping"
 *       500:
 *         description: Error retrieving outcome records.
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
router.get('/consumes/outcome', routerHandler.getOutcome);

/**
 * @swagger
 * /consumes/income:
 *   get:
 *     summary: Get all income records
 *     description: Retrieves all income records for a specific family.
 *     tags:
 *       - Consumes
 *     parameters:
 *       - in: query
 *         name: family_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the family to retrieve income records for.
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved all income records.
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
 *                   example: 获取所有收入记录成功
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       member_id:
 *                         type: integer
 *                         example: 1
 *                       memberName:
 *                         type: string
 *                         example: "John Doe"
 *                       amount:
 *                         type: number
 *                         example: 100.50
 *                       transactionType:
 *                         type: integer
 *                         example: 1
 *                       consumeDate:
 *                         type: string
 *                         format: date
 *                         example: "2024-09-01"
 *                       recipient:
 *                         type: string
 *                         example: "Employer"
 *                       category:
 *                         type: string
 *                         example: "Salary"
 *                       userNote:
 *                         type: string
 *                         example: "Monthly salary"
 *       500:
 *         description: Error retrieving income records.
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
router.get('/consumes/income', routerHandler.getIncome);

/**
 * @swagger
 * /consumes/category:
 *   get:
 *     summary: Get all unique categories
 *     description: Retrieves all unique categories of consume records.
 *     tags:
 *       - Consumes
 *     responses:
 *       200:
 *         description: Successfully retrieved all unique categories.
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
 *                   example: 获取所有分类成功
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "Food"
 *       500:
 *         description: Error retrieving categories.
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
router.get('/consumes/category', routerHandler.getCategory);

/**
 * @swagger
 * /outcome/conditions:
 *   get:
 *     summary: Get outcome records by conditions
 *     description: Retrieves outcome records based on specified conditions like name, date, category, etc.
 *     tags:
 *       - Consumes
 *     parameters:
 *       - in: query
 *         name: family_id
 *         schema:
 *           type: integer
 *         description: The ID of the family to retrieve outcome records for.
 *         example: 1
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: The name of the member to filter records by.
 *         example: "John Doe"
 *       - in: query
 *         name: consumeDate
 *         schema:
 *           type: string
 *           format: date
 *         description: The date to filter records by.
 *         example: "2024-09-01"
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: The category to filter records by.
 *         example: "Food"
 *     responses:
 *       200:
 *         description: Successfully retrieved outcome records based on conditions.
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
 *                   example: 查询成功
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       member_id:
 *                         type: integer
 *                         example: 1
 *                       memberName:
 *                         type: string
 *                         example: "John Doe"
 *                       amount:
 *                         type: number
 *                         example: 100.50
 *                       transactionType:
 *                         type: integer
 *                         example: 0
 *                       consumeDate:
 *                         type: string
 *                         format: date
 *                         example: "2024-09-01"
 *                       recipient:
 *                         type: string
 *                         example: "Grocery Store"
 *                       category:
 *                         type: string
 *                         example: "Food"
 *                       userNote:
 *                         type: string
 *                         example: "Weekly grocery shopping"
 *       500:
 *         description: Error retrieving outcome records based on conditions.
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
router.get('/outcome/conditions', routerHandler.getOutcomeByConditions);

/**
 * @swagger
 * /income/conditions:
 *   get:
 *     summary: Get income records by conditions
 *     description: Retrieves income records based on specified conditions like name, date, category, etc.
 *     tags:
 *       - Consumes
 *     parameters:
 *       - in: query
 *         name: family_id
 *         schema:
 *           type: integer
 *         description: The ID of the family to retrieve income records for.
 *         example: 1
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: The name of the member to filter records by.
 *         example: "John Doe"
 *       - in: query
 *         name: consumeDate
 *         schema:
 *           type: string
 *           format: date
 *         description: The date to filter records by.
 *         example: "2024-09-01"
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: The category to filter records by.
 *         example: "Salary"
 *     responses:
 *       200:
 *         description: Successfully retrieved income records based on conditions.
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
 *                   example: 查询成功
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       member_id:
 *                         type: integer
 *                         example: 1
 *                       memberName:
 *                         type: string
 *                         example: "John Doe"
 *                       amount:
 *                         type: number
 *                         example: 1000.00
 *                       transactionType:
 *                         type: integer
 *                         example: 1
 *                       consumeDate:
 *                         type: string
 *                         format: date
 *                         example: "2024-09-01"
 *                       recipient:
 *                         type: string
 *                         example: "Employer"
 *                       category:
 *                         type: string
 *                         example: "Salary"
 *                       userNote:
 *                         type: string
 *                         example: "Monthly salary"
 *       500:
 *         description: Error retrieving income records based on conditions.
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
router.get('/income/conditions', routerHandler.getIncomeByConditions);

module.exports = router;
