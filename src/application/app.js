const app = require('express')();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const routes = require('./router/index');

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());

app.use(routes);

app.use((req, res) => {
  res.status(404).json('Route not found');
});

app.use((err, req, res, next) => {
  if (err.error) {
    return res
      .status(400)
      .json({ message: err.error.stack || err.error.message });
  }
  return next(err);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _) => res.status(err.status || 500).json({ message: err.message }));

module.exports = app;
