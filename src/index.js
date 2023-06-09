const express = require('express');

const expressConfig = require('./config/expressConfig.js');
const handlebarsConfig = require('./config/handlebarsConfig.js');
const routes = require('./routes.js');
const dbConnect = require('./config/dbConfig.js'); 


const app = express();

const PORT = 3000;

expressConfig(app);
// require('./config/expressConfig.js')(app);
handlebarsConfig(app);

dbConnect()
    .then(() => console.log('DB connected successfully'))
    .catch(err => { console.log('DB error: ', err) });

// Routes
app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));