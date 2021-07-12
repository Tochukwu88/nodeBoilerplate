const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const Authsys = require('./controllers/auth');
const authinstance = new Authsys();
require('dotenv').config();
mongoose
  .connect(process.env.MONGOOSE_DEV_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('db has been connected'))
  .catch((err) => {
    console.log(err.message);
  });
app.use(morgan('dev'));
app.use(express.json());

app.use('/', authRoutes);

const port = 8000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
module.exports = {
  app,
  authinstance,
};
