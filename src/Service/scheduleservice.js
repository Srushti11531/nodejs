const schedule = require('node-schedule');
const userRepo = require('../Repository/userRepository');

const scheduleUserUnblock = (user, blockedAt) => {
  if (!user || !blockedAt) return;

  // Use a unique job key based on user ID
  const jobKey = `unblock_${user.id}`;
  console.log('scheduleJob set')

  schedule.scheduleJob(jobKey, blockedAt, async () => {
    try {
      await userRepo.updateUser(user.id, {
        loginAttempts: 0,
        blockedAt: null,
      });

      console.log(` User "${user.name}" (${user.email}) has been automatically unblocked.`);
    } catch (error) {
      console.error(` Failed to unblock user "${user.name}" (${user.email}):`, error);
    }
  });

  // console.log(` Unblock job scheduled for "${user.name}" (${user.email}) at ${user.blockedAt}`);
};
module.exports = {
  scheduleUserUnblock,
};