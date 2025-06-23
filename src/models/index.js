// model.user = userModel;
// module.exports = model;
const User = require('./user');
const menu = require('./menu');
const Product=require('./product')

// User.belongsTo(menu, {
//     as: 'menus',
//     foreignKey: 'menuId'
// })

//Correct one-to-many relationship
// User.hasMany(menu, {
//   foreignKey: 'menuIds',
//   as: 'menus',
// });

User.hasMany(menu, {
  foreignKey:'id',
  // sourceKey: 'menuIds',
  as: 'menus',
  constraints:false
  
});
// menu.belongsToMany(User, {
//   through: 'UserMenus',
//   as: 'users',
//   foreignKey: 'menuId'
// });
// Menu.belongsTo(User, {
//   foreignKey: 'userId',
//   as: 'User', // menu → one user
// });

Product.belongsTo(User, {
  foreignKey: 'userId',
  as: 'creator'
});



// User.hasMany(menu, { foreignKey: 'menuId' });
// menu.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, menu,Product };
// const db = {};

// db.menu.belongsTo(db.User, { foreignKey: 'userId', as: 'User' });
// db.User.hasMany(db.menu, { foreignKey: 'userId', as: 'menus' });

//  module.exports = { User, menu };

