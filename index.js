var express = require('express')
var app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const {items} = require('./data.json')

const getJobs = (data) => {
    if (data.action !== 'kabo.webhook.getJobs')
        return
    return items;
}

app.get('/', function(req, res) {
    res.send('Hello World')
})

app.post('/webhook', function(req, res) {
    console.log(req.body)
    const data = getJobs(req.body.result).map((item) => item.link)
    const responseData = {
        "speech": data.join("\n"),
        "displayText": data.join("\n"),
        "data": {},
        "contextOut": [],
        "source": "KMS"
    }
    res.json(responseData)
})
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Our app is running on port '  + port);
})
