const cron = require('node-cron');
function cronJob() {
 console.log('Cron job executed at:', new Date().toLocaleString());
}
// Schedule the cron job to run every 10 minutes
cron.schedule('*/10 * * * *', () => {
 cronJob();
});