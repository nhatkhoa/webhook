var express = require('express')
var app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const {items} = require('./data.json')

const getJobs = (data) => {
    if (data.action !== 'kabo.getJobs')
        return
    return items;
}

app.get('/', function(req, res) {
    res.send('Hello World')
})

app.get('/webhook', function(req, res) {
    req.body = {
        action: 'kabo.getJobs'
    }
    console.log(req.body)
    const data = getJobs(req.body).map((item) => item.link)
    const responseData = {
        "speech": "",
        "displayText": JSON.stringify(data),
        "data": {
        },
        "contextOut": "",
        "source": "KMS"
    }
    res.send(responseData)
})
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Our app is running on port '  + port);
})
