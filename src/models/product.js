// class User {
//     static getAll() {
//       return ['tcs', 'techrover', 'infotech'];
//     }
//   }

//   module.exports = User;

const {  DataTypes } = require("sequelize");
const db = require("../config/db.config");
// var User = db.define(
//     "users",
//     {
//         id: { type: DataTypes.INTEGER, primaryKey: true },
//         name: { type: DataTypes.STRING },
//         email: { type: DataTypes.STRING },
//         // token: { type: sequelize.STRING },
//     },
//     {
//         tableName:'users',
//         timestamps: false,
//     }
// );
// Define the User model
const product = db.define('products', {
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
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // age: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    // },
    softdelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },

    userId: {  // Foreign key
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: 'users',
        //     key: 'id'
        // }
    }
}, {
    tableName: 'products',  // Custom table name (optional)
    timestamps: true,
});
// db.sync().then(()=>{
//     console .log("dbconnected")
// })


module.exports = product;


// //pagination
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
// module.exports = User;
