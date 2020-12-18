const app = require('./app');

app.listen(process.env.PORT, (err) => {
  if (err) return console.log('Failed to start', err);
  return console.log('Listening on PORT', process.env.PORT);
});
