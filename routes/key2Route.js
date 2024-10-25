const { wrap } = require('../functions/wrapFunction')
const fs = require('fs');


module.exports = wrap(async function (req, res) {
    console.log(req.params.salt.replace(/\+/g, ' '))
    fs.appendFile('output.txt', req.params.salt.replace(/\+/g, ' ') + '\n', (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Data appended to output.txt');
        }
      });
    return res.status(200).json({status: 100, data: {
        data: req.params.salt,
    },
})
})