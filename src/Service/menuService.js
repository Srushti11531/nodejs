// const userRepository = require('../Repository/userRepository');

// const getUsersByEmailStart = async (req) => {

//     // const { letter } = req;
//     // if (!letter || letter.length !== 1) {
//     //     throw new Error('Invalid letter input');
//     // }

//     return await userRepository.searchUsers(req);
// };

// module.exports = {
//     getUsersByEmailStart,
// };


// services/userService.js
const menuRepo = require('../Repository/menuRepository');

const createmenu = async (data) => {
  return await menuRepo.createmenu(data);
};

const getmenuById = async (id) => {
  return await menuRepo.getmenuById(id);
};

const updatemenu= async (id, data) => {
  return await menuRepo.updatemenu(id, data);
};

const deletemenu = async (id) => {
  return await menuRepo.softDeletemenu(id);
};

const getmenuBynameStart = async ({ search }) => {
  return await menuRepo.filtermenuByname(search);
};

const filtermenuBynameIn = async ({ search }) => {
  return await menuRepo.filtermenuBynameIn(search);
};
const getmenu = async (req) => {
  return await menuRepo.getmenu(req);
};
const getmenuWithUsers = async ({ data }) => {
  return await menuRepo.getmenuWithUsers(data);
};
const bulkCreateMenusWithUsers = async ( menusData) => {
  return await menuRepo.bulkCreateMenusWithUsers( menusData);
};

module.exports = {
  createmenu,
  getmenuById,
  updatemenu,
  getmenuWithUsers,
  deletemenu,
  getmenuBynameStart,
  filtermenuBynameIn,
  getmenu,
  bulkCreateMenusWithUsers,
};
