const express = require('express');
const path = require('path');
const buildPath = path.join(__dirname, './dist');

const app = express();

app.use(express.static(buildPath));

app.locals.ENV = process.env.NODE_ENV;
app.locals.ENV_DEVELOPMENT = process.env.NODE_ENV === 'development';

app.disable('x-powered-by');

app.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.httpStatus);
    if (err.body) {
      return res.json(err.body);
    }
    return res.send({ error: err.message });
  }
  res.sendStatus(500);
});

app.use('*', (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;
