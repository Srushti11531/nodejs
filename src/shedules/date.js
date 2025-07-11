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

// const schedule = require('node-schedule');

// //Start Date (10 sec from now for demo)
// const startDate = new Date(Date.now() + 10 * 1000); // 10 sec baad
// const endDate = new Date(startDate.getTime() + 10 * 60 * 1000); // Total 10 minutes ka window

// console.log('office Scheduled from:', startDate.toLocaleString('en-NP', { timeZone: 'Asia/Kuwait' }),
//     'to', endDate.toLocaleString('en-NP', { timeZone: 'Asia/Kuwait' }));

// // Cron Expression (every minute)
// const cronExpression = '* * * * *';

// let mainJob;

// // START MAIN JOB
// function startMainJob(fromTime, toTime) {
//     mainJob = schedule.scheduleJob({ start: fromTime, end: toTime, rule: cronExpression, tz: 'Asia/Kuwait' }, () => {
//         const now = new Date();
//         console.log('\n tz Running...');
//         console.log('Kuwait Time:', now.toLocaleString('en-NP', { timeZone: 'Asia/Kuwait' }));
//         console.log('Kolkata Time  :', now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
//     });
// }

// // INITIAL START
// startMainJob(startDate, endDate);

// //STOP after 2 minutes from startDate
// const stopTime = new Date(startDate.getTime() + 2 * 60 * 1000);
// schedule.scheduleJob(stopTime, () => {
//     if (mainJob) {
//         mainJob.cancel();
//         console.log('\n office closed at:', new Date().toLocaleString('en-NP', { timeZone: 'Asia/Kuwait' }));
//     }
// });

// // RESTART after 3 minutes from startDate 
// const resumeTime = new Date(startDate.getTime() + 3 * 60 * 1000);
// schedule.scheduleJob(resumeTime, () => {
//     console.log('office restarting at:', new Date().toLocaleString('en-NP', { timeZone: 'Asia/Kuwait' }));
//     startMainJob(resumeTime, endDate);
// });

// //  CRON-BASED HOURLY COUNTER STARTING FROM startDate
// let hourCount = 0;
// const maxHours = 3;
// let hourlyJob = null;

// // Schedule hourly count job to begin exactly at startDate
// schedule.scheduleJob(startDate, () => {
//     console.log('\n Hourly Counter Cron office started at:', new Date().toLocaleString('en-NP', { timeZone: 'Asia/Kuwait' }));

//     // Runs every minute for demo, change to '0 * * * *' for actual hourly
//     hourlyJob = schedule.scheduleJob('*/1 * * * *', () => {
//         hourCount++;
//         console.log(`\nHour Passed Count: ${hourCount} — at ${new Date().toLocaleString('en-NP', { timeZone: 'Asia/Kuwait' })}`);

//         // if (hourCount >= maxHours) {
//         //     hourlyJob.cancel();
//         //     console.log(' Hourly Cron Job Cancelled after 3 counts');
//         // }
//         if (hourCount >= maxHours) {
//       // Stop 
//       hourlyJob.cancel();
//       if (hourlyJob) {
//         hourlyJob.cancel();
//         console.log('\n hourJob stopped at:',
//           new Date().toLocaleString('en-NP', { timeZone: 'Asia/Kuwait' }));
//       }
//       console.log(' Cron Job Cancelled after 3 hours');

//     }
//  } );
// });


// const schedule = require('node-schedule');

// // Start time - after 10 sec
// const startDate = new Date(Date.now() + 10 * 1000); // 10 sec later
// const threeMinEnd = new Date(startDate.getTime() + 3 * 60 * 1000); // 3 minutes duration
// const restartTime = new Date(threeMinEnd.getTime() + 5 * 60 * 1000); // Restart after 5 min
// const finalEnd = new Date(restartTime.getTime() + 10 * 60 * 1000); // Optional: final session end

// const cronExpression = '* * * * *'; // Every minute

// let mainJob;
// let hourlyLogJob;
// let logCount = 0;
// const maxLogs = 3;

// // Reusable main OFFICE function
// function startMainJob(fromTime, toTime) {
//   mainJob = schedule.scheduleJob({ start: fromTime, end: toTime, rule: cronExpression }, () => {
//     const now = new Date();
//     console.log(`\n[MAIN office open]`);
//     console.log('Kuwait Time :', now.toLocaleString('en-NP', { timeZone: 'Asia/Kuwait' }));
//     console.log('Kolkata Time:', now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
//   });
// }

// // Log count every 1 hour 
// function startHourlyLog() {
//   hourlyLogJob = schedule.scheduleJob('*/1 * * * *', () => {
//     logCount++;
//     const now = new Date().toLocaleString('en-NP', { timeZone: 'Asia/Kolkata' });
//     console.log(`\n[LOG ${logCount}] at: ${now}`);

//     if (logCount >= maxLogs) {
//       if (hourlyLogJob) {
//         hourlyLogJob.cancel();
//         console.log('\nHourly Log office close after 3 logs.');
//       }
//     //   if (mainJob) {
//     //     mainJob.cancel();
//     //     console.log('Main office close after 3 logs.');
//     //   }
//     }
//   });
// }

// // START MAIN OFFICE for 3 min
// console.log(' Scheduling main office from:', startDate.toLocaleString(), 'to', threeMinEnd.toLocaleString());
// startMainJob(startDate, threeMinEnd);

// // STOP MAIN OFFICE (after 3 min)
// schedule.scheduleJob(threeMinEnd, () => {
//   if (mainJob) {
//     mainJob.cancel();
//     console.log('\n Main office close after 3 minutes at:', new Date().toLocaleString('en-NP', { timeZone: 'Asia/Kolkata' }));
//   }
// });

// // RESTART after 5 more minutes
// schedule.scheduleJob(restartTime, () => {
//   console.log('\n Restarting main office at:', new Date().toLocaleString('en-NP', { timeZone: 'Asia/Kolkata' }));
//   startMainJob(restartTime, finalEnd);
// });

// // START HOURLY LOGGER (demo: every minute)
// schedule.scheduleJob(startDate, () => {
//   console.log('\n Starting hourly log counter (demo: per minute)...');
//   startHourlyLog();
// });

const schedule = require('node-schedule');

// Start Date (10 sec from now)
const startDate = new Date(Date.now() + 10 * 1000);
const endDate = new Date(startDate.getTime() + 10 * 60 * 1000); // 10-minute total window

console.log('office Scheduled from:',startDate.toLocaleString('en-NP', { timeZone: 'Asia/Kuwait' }),
  'to', endDate.toLocaleString('en-NP', { timeZone: 'Asia/Kuwait' })
);

const cronExpression = '* * * * *';
let mainJob;

// MAIN JOB FUNCTION
function startMainJob(fromTime, toTime) {
  mainJob = schedule.scheduleJob({start: fromTime,end: toTime,rule: cronExpression,tz: 'Asia/Kuwait'},
   () => {
    const now = new Date();
    console.log('\noffice open...');
    console.log('Kuwait Time:', now.toLocaleString('en-NP', { timeZone: 'Asia/Kuwait' }));
    console.log('Kolkata Time  :', now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
  });
}

//RESCHEDULE FUNCTION
function rescheduleMainJob(newStartTime) {
  const updatedRule = {start: newStartTime,end: endDate,rule: cronExpression,tz: 'Asia/Kuwait'};
  const result = mainJob.reschedule(updatedRule);
  console.log(result ? ' mainoffice successfully rescheduled!': ' Failed to reschedule mainoffice');
}

//Initial Start
startMainJob(startDate, endDate);

// Minute Counter Logic
let minuteCount = 0;
const maxMinutes = 3;

schedule.scheduleJob(startDate, () => {
  console.log(' Minute Counter Started at:',new Date().toLocaleString('en-NP', { timeZone: 'Asia/Kuwait' }));

  const minuteJob = schedule.scheduleJob('*/1 * * * *', () => {
    minuteCount++;
    console.log(`Minute Passed Count: ${minuteCount} — at`,
      new Date().toLocaleString('en-NP', { timeZone: 'Asia/Kuwait' }));

    if (minuteCount >= maxMinutes) {
      // Stop both jobs
      minuteJob.cancel();
      if (mainJob) {
        mainJob.cancel();
        console.log('\n mainoffice stopped at:',
          new Date().toLocaleString('en-NP', { timeZone: 'Asia/Kuwait' }));
      }
      console.log(' Cron office Cancelled after 3 minutes');

      // Schedule resume after 5 minutes from STOP point
      const now = new Date();
      const resumeTime = new Date(now.getTime() + 5 * 60 * 1000);
      console.log(' mainoffice will resume at:',
        resumeTime.toLocaleString('en-NP', { timeZone: 'Asia/Kuwait' }));

      // Use scheduleJob to delay reschedule without setTimeout
      schedule.scheduleJob(resumeTime, () => {
        console.log('\nRestarting mainoffice at:',
          new Date().toLocaleString('en-NP', { timeZone: 'Asia/Kuwait' }));
        rescheduleMainJob(resumeTime);
      });
    }
  });
});