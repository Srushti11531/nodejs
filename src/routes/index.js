const express = require('express');
const router = express.Router();
// const userController = require('../controllers/UserController');

const menuRoutes = require('./menuRoutes');
const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');


// Create a new user
router.use('/menu', menuRoutes);
router.use('/product', productRoutes);

router.use('/users', userRoutes);


const excelRoutes = require('./excelrouter');
//create a new file
router.use('/exccel', excelRoutes);

//router.use('/file', fileRoutes);
router.use('/excel', excelRoutes);


// Get all users
//  router.use('/users', userRoutes);

// // // Get a user by ID
// // router.get('/users/:id', userController.getUserById);


// // // Update a user by ID
// router.put('/users/:id', userRoutes);

// // // Delete a user by ID
// router.delete('/users/:id', userRoutes);

// const User = require('../models/user');
// const Product = require('../models/product');

// // One-to-Many relationship
// User.hasMany(Product, { foreignKey: 'userId' });
// Product.belongsTo(User, { foreignKey: 'userId' });

// module.exports = { User, Product };
// //const { User, Product } = require('./models');

// const getProductsWithUsers = async () => {
//     const products = await Product.findAll({
//         include: [{
//             model: User,
//             attributes: ['id', 'name', 'email']  // Select specific fields
//         }]
//     });

//     console.log(JSON.stringify(products, null, 2));
// };

// getProductsWithUsers();


module.exports = router;