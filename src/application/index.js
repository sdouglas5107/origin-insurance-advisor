const app = require('express')();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const routes = require('./router/index');

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());

app.use(routes);

app.listen(process.env.PORT, (err) => {
  if (err) return console.log('Failed to start', err);
  return console.log('Listening on PORT', process.env.PORT);
});
