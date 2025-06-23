const bcrypt = require('bcrypt');

async function isValidPassword(inputPassword, storedPasswordHash) {
  try {
    return await bcrypt.compare(inputPassword, storedPasswordHash);
  } catch (error) {
    console.error('Password comparison failed:', error);
    return false;  // return false if error occurs during comparison
  }
}

async function hashPassword(password) {
  if (!password) throw new Error('Password is required');
  return await bcrypt.hash(password, 10);
}

// async function isValidPassword(inputPassword, storedPasswordHash) {
//   try {
//     return await bcrypt.compare(inputPassword, storedPasswordHash);
//   } catch (error) {
//     console.log(error)
//     //throw new Error('Password comparison failed');
//   }
// }

module.exports = { hashPassword, isValidPassword };
