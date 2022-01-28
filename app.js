const express = require('express');
const adminRouter = require('./admin/adminJS');

require('./config/mongoose');

const PORT = process.env.PORT || 3000;

const app = express();

app.use('/admin', adminRouter);

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
