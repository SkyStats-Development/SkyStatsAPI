//CREDIT: https://github.com/Senither/hypixel-skyblock-facade (Modified)
const NotFound = require('../middleware/notfound');
const Auth = require('../middleware/auth');
const ErrorHandler = require('../middleware/errorhandler');
const rateLimit = require('express-rate-limit');
const express = require('express');
const oauthRoute = require('../routes/oauthRoute');
const partyStatsRoute = require("../routes/partyStatsRoute")
const testRoute = require('../routes/testRoute');
const keyRoute = require("../routes/keyRoute")
const key2Route = require("../routes/key2Route")

const app = express();

const checkForUpdate = require('../middleware/checkforupdate');
require('dotenv').config();
const port = 6832;

process.on('uncaughtException', (error) => console.log(error));
process.on('unhandledRejection', (error) => console.log(error));

const limiter = rateLimit({
    windowMs: 1000 * 60, // 1 minute
    max: 512, // resources needed to craft most t4 minions in hypixel skyblock!
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        message: 'Too many requests, please try again later.',
    },
});
app.get(`/data/:salt`, key2Route)

app.get('/ping', async (req, res) => {
    res.send("pong")
  })
  
app.use(limiter);
app.get(`/auth/:salt`, oauthRoute)
app.use(Auth);
app.use(require('cors')());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true }));
app.get(`/test`, testRoute);
app.get(`/generateHash/:salt`, keyRoute)
app.get(`/partyfinder/:username`, partyStatsRoute)
app.use(NotFound);
app.use(ErrorHandler);


checkForUpdate();

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
