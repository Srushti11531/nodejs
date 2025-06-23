const express = require('express');
const router = express.Router();
//const userController = require('../controllers/productController');
//const productController = require('../controllers/productController');
const menuController=require('../controllers/menuController');

router.get('/menu-users', menuController.getmenuWithUsers);

router.post('/page',menuController.getmenu)


router.post('/search', menuController.getmenuBynameLetter);


// Create a new user
router.post('/add', menuController.createmenu);

// Get all users
//router.get('/all', userController.getproductById);



// Create a new user
// router.post('/users', userController.createUser);

// Get all users
// router.get('/users', userController.getAllUsers);

// // Get a user by ID
router.get('/:id', menuController.getmenuById);

// // Update a user by ID
 router.put('/:id', menuController.updatemenu);

// // Delete a user by ID
 router.delete('/:id', menuController.deletemenu);

//bulk

router.post('/bulk-menus', menuController.bulkCreateMenusWithUsers);

  router.get('/menu', menuController.getmenu);

 //show email
module.exports = router;


//module.exports = router;
