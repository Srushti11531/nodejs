const swaggerJsDoc = require('swagger-jsdoc');
const path=require('path');
// const express = require('express');
// const swaggerUi = require('swagger-ui-express');
// const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation for my Node.js MVC application',
    },
    servers: [
      {
        url: 'http://localhost:5000/', // Replace with your server URL
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
apis: [path.join(__dirname, '../docs/*.yaml')], // apis: ['../docs/*.yaml','../routes/*.js'], // Path to your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
//app.use('./docs/item.yaml', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


module.exports = swaggerDocs;




// const express = require('express');
// const router = express.Router();
// const itemController = require('../controllers/UserController');

// /**
//  * @swagger
//  * /api/items:
//  *   get:
//  *     summary: Get all items
//  *     responses:
//  *       200:
//  *         description: Returns all items
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Item'
//  */
// router.get('/', itemController.getUsersByEmailLetter);

// /**
//  * @swagger
//  * /api/items/{id}:
//  *   get:
//  *     summary: Get an item by ID
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: integer
//  *         required: true
//  *         description: Numeric ID of the item to get
//  *     responses:
//  *       200:
//  *         description: Returns the specified item
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Item'
//  *       404:
//  *         description: Item not found
//  */
// router.delete('/:id', itemController.deleteUser);

// /**
//  * @swagger
//  * /api/items:
//  *   post:
//  *     summary: Add a new item
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Item'
//  *     responses:
//  *       201:
//  *         description: New item created
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Item'
//  */
// router.post('/', itemController.createUser);

// module.exports = router;