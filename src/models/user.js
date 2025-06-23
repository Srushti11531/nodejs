// class User {
//     static getAll() {
//       return ['tcs', 'techrover', 'infotech'];
//     }
//   }

//   module.exports = User;

const { sequelize, DataTypes } = require("sequelize");
const db = require("../config/db.config");
// const Menu = require("./menu")
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
const bcrypt = require("bcrypt");

const User = db.define('users', {
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    softdelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    menuIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
    },
      password: 
      { 
        type: DataTypes.STRING,
         allowNull: false
         },

    gender:
    {
    type: DataTypes.ENUM('MALE', 'FEMALE'),
        allowNull:true,
    }

}, {
    tableName: 'users',  // Custom table name (optional)
    timestamps: true,

  hooks: {
    beforeCreate: async (user) => {
      if (user.password) user.password = await bcrypt.hash(user.password, 10);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) user.password = await bcrypt.hash(user.password, 10);
    },
  },
  });
  User.prototype.isValidPassword = async function(password) {
   return await bcrypt.compare(password, this.password);
   };

//   return User;
// db.sync().then(()=>{
//     console .log("dbconnected")
// })
//User.hasMany(Menu, { foreignKey: 'userId', as: 'menus' });
// User.associate = (models) => {
//   User.hasMany(models.Menu, {
//     foreignKey: 'userId',
//     as: 'Menus', // plural, one user → many menus
//   });


//   User.associate = (models) => {
//     User.hasMany(models.Menu, {
//       foreignKey: 'menuId',
//       as: 'menus', 
//     });
//   };

module.exports = User;
