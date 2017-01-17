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
        "speech": data.slice(0, 3).join("\n"),
        "displayText": data.slice(0, 3).join("\n"),
        "data": {
            "facebook": {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "Welcome to Peter\'s Hats",
                                "image_url": "https://petersfancybrownhats.com/company_image.png",
                                "subtitle": "We\'ve got the right hat for everyone.",
                                "default_action": {
                                    "type": "web_url",
                                    "url": "https://peterssendreceiveapp.ngrok.io/view?item=103",
                                    "messenger_extensions": true,
                                    "webview_height_ratio": "tall",
                                    "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                                },
                                "buttons": [
                                    {
                                        "type": "web_url",
                                        "url": "https://petersfancybrownhats.com",
                                        "title": "View Website"
                                    }, {
                                        "type": "postback",
                                        "title": "Start Chatting",
                                        "payload": "DEVELOPER_DEFINED_PAYLOAD"
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        },
        "contextOut": [],
        "source": "KMS"
    }
    res.json(responseData)
})
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Our app is running on port ' + port);
})
