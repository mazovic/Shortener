// File path: src/modules/url/routes/url.routes.ts

import { Router } from 'express';
import { urlController } from '../controllers/url.controller';
import { validateRequest } from '../../../middlewares/validateRequest';
import { createUrlSchema } from '../schemas/url.schema';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UrlObj:
 *       type: object
 *       required:
 *         - id
 *         - shortUrl
 *         - originalUrl
 *         - visitCount
 *         - createdAt
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of the shortened URL
 *         shortUrl:
 *           type: string
 *           description: The shortened URL path
 *         originalUrl:
 *           type: string
 *           description: The original URL that was shortened
 *         visitCount:
 *           type: number
 *           description: Number of times the shortened URL has been visited
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the URL was created
 *         lastVisitedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: The date and time when the URL was last visited
 *     CreateUrlInput:
 *       type: object
 *       required:
 *         - originalUrl
 *       properties:
 *         originalUrl:
 *           type: string
 *           description: The URL to be shortened
 *           example: "https://www.example.com/very/long/path/that/needs/shortening"
 *     ApiResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: Response status
 *         data:
 *           $ref: '#/components/schemas/UrlObj'
 *   responses:
 *     BadRequest:
 *       description: Invalid input data
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: 'error'
 *               message:
 *                 type: string
 *                 example: 'Invalid URL format'
 *     InternalServerError:
 *       description: Server error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: 'error'
 *               message:
 *                 type: string
 *                 example: 'Internal server error'
 */

/**
 * @swagger
 * tags:
 *   name: URLs
 *   description: URL shortening operations
 */

/**
 * @swagger
 * /api/urls:
 *   post:
 *     summary: Create a shortened URL
 *     description: Takes a long URL and returns a shortened version
 *     tags: [URLs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUrlInput'
 *     responses:
 *       201:
 *         description: URL successfully shortened
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               status: 'success'
 *               data:
 *                 id: '550e8400-e29b-41d4-a716-446655440000'
 *                 shortUrl: 'abc123'
 *                 originalUrl: 'https://www.example.com/very/long/path/that/needs/shortening'
 *                 visitCount: 0
 *                 createdAt: '2023-06-15T10:30:00.000Z'
 *                 lastVisitedAt: null
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post(
  '/',
  validateRequest(createUrlSchema),
  urlController.createShortUrl.bind(urlController),
);

/**
 * @swagger
 * /api/urls:
 *   get:
 *     summary: Retrieve all shortened URLs
 *     description: Returns a list of all URLs that have been shortened
 *     tags: [URLs]
 *     responses:
 *       200:
 *         description: A list of shortened URLs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UrlObj'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

router.get('/', urlController.findAll.bind(urlController));

/**
 * @swagger
 * /api/urls/{shortUrl}:
 *   get:
 *     summary: Get details of the original URL by its shortened code
 *     description: Retrieves the full URL and associated metadata using the shortened URL identifier
 *     tags: [URLs]
 *     parameters:
 *       - in: path
 *         name: shortUrl
 *         required: true
 *         schema:
 *           type: string
 *         description: The shortened URL identifier
 *     responses:
 *       200:
 *         description: Successfully retrieved the original URL data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               status: 'success'
 *               data:
 *                 id: '550e8400-e29b-41d4-a716-446655440000'
 *                 shortUrl: 'abc123'
 *                 originalUrl: 'https://www.example.com/very/long/path/that/needs/shortening'
 *                 visitCount: 1
 *                 createdAt: '2023-06-15T10:30:00.000Z'
 *                 lastVisitedAt: '2023-06-16T12:45:00.000Z'
 *       404:
 *         description: Shortened URL not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 'error'
 *                 message:
 *                   type: string
 *                   example: 'URL not found'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

router.get('/:shortUrl', urlController.findByShortUrl.bind(urlController));
export default router;
