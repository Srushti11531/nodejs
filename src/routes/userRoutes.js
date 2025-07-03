const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { fetchAllUsers } = require('../controllers/UserController');
const User=require('../models/user');
const authenticateToken = require('../middleware/authMiddleware');
const { registerUser } = require('../controllers/UserController');
const { sendMultipleEmails } = require('../controllers/UserController');


// Create a new user
router.post('/register', userController.createUser);
router.post('/send-emails', sendMultipleEmails);
router.post('/schedule', userController.scheduleEmails);



router.post('/send-emails', userController.sendMultipleEmails);
router.get('/users-menus', authenticateToken,userController.getUsersWithMenus);
router.post('/upsert', userController.upsertUser);


// Create a new user
router.post('/add', userController.createUser);

router.post('/user', userController.User);

 

// Get all users
router.get('/all',authenticateToken, userController.getUserById);

//pag

router.post('/page',userController.getmenu)

router.post('/login', userController.login);

// Create a new user
// router.post('/users', userController.createUser);

// Get all users
// router.get('/users', userController.getAllUsers);

// // Get a user by ID
router.get('/:id', userController.getUserById);

// // Update a user by ID
 router.put('/:id',authenticateToken, userController.updateUser);

// // Delete a user by ID
 router.delete('/:id',authenticateToken, userController.deleteUser);


 router.post('/bulk-menu/update',userController.bulkUpdateUsers);

 //show email

//swagger
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/', (req, res) => {
    res.status(200).json([
      { id: 1, name: 'aaa bbb Updated', email: 'xyzabdc@gmail.com', menuIds : [3]},
    ]);
  });
  //swagger ke liye
  router.get('/', userController.fetchAllUsers);

module.exports = router;

//module.exports = router;
