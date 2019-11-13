const checksum_lib = require('./checksum');
const axios = require('axios');
var request = require('request');

module.exports = {

    gotopaytm(req, res) {
        checksum_lib.genchecksum(req.body, `${process.env.paytmMerchantKey}`, async function (err, checksum) {
            const validchecksum = await checksum_lib.verifychecksum(req.body, `${process.env.paytmMerchantKey}`, checksum);
            if (validchecksum) {
                console.log('checksum is valid', checksum);
                return res.json({ checksum: checksum });

            } else {
                console.log('checksum is not valid');

            }
        })
    },
   
}
