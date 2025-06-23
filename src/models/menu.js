// class User {
//     static getAll() {
//       return ['tcs', 'techrover', 'infotech'];
//     }
//   }

//   module.exports = User;

const { sequelize, DataTypes } = require("sequelize");
const db = require("../config/db.config");
//const User=require("./user")
// var User = db.define(
//     "users",
//     {
//         id: { type: sequelize.INTEGER, primaryKey: true },
//         name: { type: sequelize.STRING },
//         email: { type: sequelize.STRING },
//         // token: { type: sequelize.STRING },
//     },
//     {
//         // dont use createdAt/update
//         tableName:'users',
//         timestamps: false,
//     }
// );
// module.exports = User;
// Define the User model
const menu = db.define('menu', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // price: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    // },
    // age: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    // },
    softdelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
   
    //  userId: {  // Foreign key
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'users',
    //         key: 'id'
    //     }
    // }
    
},
{
    tableName: 'menu',  // Custom table name (optional)
    timestamps:true,
});
// Menu.associate = (models) => {
//   menu.belongsTo(models.User, {
//     foreignKey: 'userId',
//     as: 'User', // singular, one menu → one user
//   });

//    menu.associate = (models) => {
//     menu.belongsTo(models.User, {
//       foreignKey: 'userId',
//       as: 'users', 
//     });
//   };

// db.sync().then(()=>{
//     console .log("dbconnected")
// })
// menu.belongsTo(User, { foreignKey: 'userId', as: 'User' });

module.exports = menu;


//pagination
// exports.getPaginatedProducts = async (limit, offset) => {
//   const result = await db.query(
//     'SELECT * FROM products ORDER BY id LIMIT $1 OFFSET $2',
//     [limit, offset]
//   );
//   return result.rows;
// };

// exports.getProductCount = async () => {
//   const result = await db.query('SELECT COUNT(*) FROM products');
//   return parseInt(result.rows[0].count, 10);
// };
