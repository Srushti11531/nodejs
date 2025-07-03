// // schedules/date.js
// const schedule = require('node-schedule');

// // Start Date: July 2, 2025 at 2:30 PM IST
// const startDate = new Date('2025-07-02T14:30:00+05:30');

// //end date
// const endDate = new Date('2025-07-05T14:30:00+05:30');

// console.log('Job scheduled from:', startDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }), 
//             'to', endDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));

// // Define recurrence rule to run daily at 2:30 PM
// const rule = new schedule.RecurrenceRule();
// rule.hour = 14;
// rule.minute = new schedule.Range(0, 59, 10);
// rule.tz = 'Asia/Kolkata'; // India timezone

// // Schedule the job with start and end
// schedule.scheduleJob({ start: startDate, end: endDate, rule }, () => {
//   console.log('Scheduled Job Running at:', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
// });

const schedule = require('node-schedule');

//Start Date (10 sec from now for demo)
const startDate = new Date(Date.now() + 10 * 1000); // 10 sec baad
const endDate = new Date(startDate.getTime() + 10 * 60 * 1000); // Total 10 minutes ka window

console.log('Job Scheduled from:',startDate.toLocaleString('en-NP', { timeZone: 'Asia/Kathmandu' }),
  'to',endDate.toLocaleString('en-NP', { timeZone: 'Asia/Kathmandu' }));

// Cron Expression (every minute)
const cronExpression = '* * * * *';

let mainJob;

// START MAIN JOB
function startMainJob(fromTime, toTime) {
  mainJob = schedule.scheduleJob({ start: fromTime, end: toTime, rule: cronExpression, tz: 'Asia/Kathmandu' }, () => {
    const now = new Date();
    console.log('\n Job Running...');
    console.log('Kathmandu Time:', now.toLocaleString('en-NP', { timeZone: 'Asia/Kathmandu' }));
    console.log('Kolkata Time  :', now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
  });
}

// INITIAL START
startMainJob(startDate, endDate);

//STOP after 2 minutes from startDate
const stopTime = new Date(startDate.getTime() + 2 * 60 * 1000);
schedule.scheduleJob(stopTime, () => {
  if (mainJob) {
    mainJob.cancel();
    console.log('\n Job stopped at:', new Date().toLocaleString('en-NP', { timeZone: 'Asia/Kathmandu' }));
  }
});

// RESTART after 3 minutes from startDate (1 min pause)
const resumeTime = new Date(startDate.getTime() + 3 * 60 * 1000);
schedule.scheduleJob(resumeTime, () => {
  console.log('Job restarting at:', new Date().toLocaleString('en-NP', { timeZone: 'Asia/Kathmandu' }));
  startMainJob(resumeTime, endDate);
});

// ✅ CRON-BASED HOURLY COUNTER STARTING FROM startDate
let hourCount = 0;
const maxHours = 3;
let hourlyJob = null;

// Schedule hourly count job to begin exactly at startDate
schedule.scheduleJob(startDate, () => {
  console.log('\n Hourly Counter Cron Job started at:', new Date().toLocaleString('en-NP', { timeZone: 'Asia/Kathmandu' }));

  // Runs every minute for demo, change to '0 * * * *' for actual hourly
  hourlyJob = schedule.scheduleJob('*/1 * * * *', () => {
    hourCount++;
    console.log('\n Hour Passed Count: ${hourCount} — at', new Date().toLocaleString('en-NP', { timeZone: 'Asia/Kathmandu' }));

    if (hourCount >= maxHours) {
      hourlyJob.cancel();
      console.log(' Hourly Cron Job Cancelled after 3 counts');
    }
  });
});