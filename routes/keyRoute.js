const crypto = require('crypto');
const key = process.env.HYPIXEL_API_KEY;

function generateApiKey(salt) {
  const algorithm = 'sha512';
  const input = salt + Date.now() + key;
  const hash = crypto.createHmac(algorithm, input).digest('hex');
  return hash;
}

const { wrap } = require('../functions/wrapFunction')

module.exports = wrap(async function (req, res) {
    let salt = req.params.salt
    const apiKey = generateApiKey(salt);
    return res.status(200).json({status: 200, data: apiKey})
})