const express = require('express');
require('dotenv').config();
const adminRouter = require('./admin/adminJS');
const queueRouter = require('./queues');

require('./config/mongoose');
require('./config/seed');
require('./jobs');

const PORT = process.env.PORT || 3000;

const app = express();

app.use('/queues', queueRouter.getRouter());
app.use('/admin', adminRouter);

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
