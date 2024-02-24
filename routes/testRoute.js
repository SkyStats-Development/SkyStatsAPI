
const { wrap } = require('../functions/wrapFunction')

module.exports = wrap(async function (req, res) {
    let today = new Date();


    return res.status(200).json({status: 200, data: today})
})