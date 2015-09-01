var nodemailer = require('nodemailer');
var express = require("express");
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, '/public')));
/* serves main page */
app.get("/", function(req, res) {
    res.sendfile(__dirname + '/index.html')
});


app.post("/user/sendmail", function(req, res, next) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'panditsfire.vs',
            pass: 'manu_ra1'
        }
    });
    var mailOptions = {
        from: req.query.email, // sender address
        to: 'vipul.sharma@paytm.com,goelgaurish@gmail.com,jaiaset@gmail.com', // list of receivers
        text: req.query.message, // plaintext body
        html: '<b>Name : '+ req.query.name +'</b><br><b>PHONE : </b>' + req.query.phone  + '<b> Email:</b>' + req.query.email + ' Message: ' + req.query.message// html body
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            res.send(error);
        }else{
            res.send(info.response);
        }
    });
});




/* serves all the static files */
app.get(/^(.+)$/, function(req, res){
    res.sendfile(__dirname + req.params[0]);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});