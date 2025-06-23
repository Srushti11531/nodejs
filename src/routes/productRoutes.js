const express = require('express');
const router = express.Router();
//const userController = require('../controllers/productController');
const productController = require('../controllers/productController');

router.get('/products-users', productController.getProductsWithUsers);

router.post('/page',productController.getProducts)


router.post('/search', productController.getproductByEmailLetter);


// Create a new user
router.post('/add', productController.createproduct);

// Get all users
//router.get('/all', userController.getproductById);



// Create a new user
// router.post('/users', userController.createUser);

// Get all users
// router.get('/users', userController.getAllUsers);

// // Get a user by ID
router.get('/:id', productController.getproductById);

// // Update a user by ID
 router.put('/:id', productController.updateproduct);

// // Delete a user by ID
 router.delete('/:id', productController.deleteproduct);


  router.get('/products', productController.getProducts);

 //show email
module.exports = router;


//module.exports = router;
