const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());

app.use('/users', require('./routes/users'));

app.listen(3000);
//app.use(morgan);
console.log('server on port 3000');

module.exports = app;