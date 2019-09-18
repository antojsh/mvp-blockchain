var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static('www'));
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

app.get('/register', function (req, res) {
    console.log(req.query)
    request({
            method: 'GET',
            uri: "https://api.stamping.io/stamp/?evidence=" + req.query.evidence + "&reference=" + req.query.reference + "&subject=" + req.query.subject,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic MTU2ODczMDgwMjc0MTozMDhhOGUzMmE4MDdiNTQ0ZjY3YjQ1YjA4NDNkMQ=="
            }
        },
        function (error, response, body) {
            if (error) {
                return res.status(500).send(error)
            }
            res.send(body)
        })
})