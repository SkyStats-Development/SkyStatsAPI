const crypto = require('crypto');
const { getPlayer } = require("../functions/getPlayer")
const key = process.env.OUTBOUND_AUTH;
/*
    const { uuid2, username, profilename, profileid, playerData, profileData, profile, error } = await getPlayer(req.params.salt);
    if (error) {
        return  res.status(200).json({status: 200, data: {
            uuid: "ERROR_WITH_AUTH",
            apiKey: "no.auth.provided.please.use.apikey.in.header"
        },
    })
    }
*/


const { wrap } = require('../functions/wrapFunction')

module.exports = wrap(async function (req, res) {
    return res.status(200).json({status: 100, data: {
        uuid: req.params.salt,
        apiKey: key
    },
})
})