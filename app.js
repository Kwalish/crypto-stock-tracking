const express = require('express');
const adminRouter = require('./admin/adminJS');
const queueRouter = require('./queues/index');
require('dotenv').config();

require('./config/mongoose');
require('./config/seed');
require('./jobs');

const PORT = process.env.PORT || 3000;

const app = express();

app.use('/admin', adminRouter);
app.use('/admin/queues', queueRouter);

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
