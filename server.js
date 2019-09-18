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
const extendTimeoutMiddleware = (req, res, next) => {
    const space = ' ';
    let isFinished = false;
    let isDataSent = false;

    // Only extend the timeout for API requests
    if (!req.url.includes('/register')) {
        next();
        return;
    }

    res.once('finish', () => {
        isFinished = true;
    });

    res.once('end', () => {
        isFinished = true;
    });

    res.once('close', () => {
        isFinished = true;
    });

    res.on('data', (data) => {
        // Look for something other than our blank space to indicate that real
        // data is now being sent back to the client.
        if (data !== space) {
            isDataSent = true;
        }
    });

    const waitAndSend = () => {
        setTimeout(() => {
            // If the response hasn't finished and hasn't sent any data back....
            if (!isFinished && !isDataSent) {
                // Need to write the status code/headers if they haven't been sent yet.
                if (!res.headersSent) {
                    res.writeHead(202);
                }

                res.write(space);

                // Wait another 15 seconds
                waitAndSend();
            }
        }, 15000);
    };

    waitAndSend();
    next();
};

app.use(extendTimeoutMiddleware);
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
            console.log('LLEGO HASTA ACA')
            if (error) {
                return res.status(500).send(error)
            }
            res.send(body)
        })
})