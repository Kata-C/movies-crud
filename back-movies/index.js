
// Express app
const app = require('./app');

/**
 * Listener
 */
app.listen(app.get('PORT'), () => {
  console.log(`\nListening on port: ${app.get('PORT')}`);
});
