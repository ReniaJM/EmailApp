const express = require('express');
require('./servises/passport');

const app = express();
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);

