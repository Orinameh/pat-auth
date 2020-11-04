
require('dotenv').config();

const express = require("express");
const app = express();
var cors = require('cors')
const db = require("./models");
const apiRouter = require("./routes/apiRoutes");
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// cors enables the api to be accessed from different origins
app.use(cors());
app.use('/api', apiRouter);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`listening on port: http://localhost:${PORT}`)
    })
})

module.exports = app;