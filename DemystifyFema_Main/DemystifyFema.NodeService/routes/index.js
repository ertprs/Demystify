var express = require('express');
var router = express.Router();
var paytm = require('./paytm');
const checksum_lib = require('./checksum');

/* GET home page. */
router.post('/', async function (req, res) {
    console.log(req.body);
   paytm.gotopaytm(req, res);
});


//router.post('/create_Sub', async function(req, res){
//   paytm.gotopaytmtest(req, res);
//});

router.post('/callback', async function(req, res){
    const checksum = req.body.CHECKSUMHASH;

    const validchecksum = await checksum_lib.verifychecksum(req.body, `${process.env.paytmMerchantKey}`, checksum);
    if(validchecksum){
        res.redirect(`${process.env.frontEndUrl}/user/secure/subscription?orderid=${req.body.ORDERID}&txnStatus=${req.body.STATUS}` );
    } else {
        res.redirect(`${process.env.frontEndUrl}/user/secure/subscription`);

    }
})
module.exports = router;
