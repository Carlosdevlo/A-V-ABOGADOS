const createApp = require('../app');

const app = createApp();

// Export the Express app as a serverless function
module.exports = app;
