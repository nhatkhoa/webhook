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
        "speech": "speech",
        "displayText": "text",
        "data": {
            "facebook": {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "list",
                        "elements": [
                            {
                                "title": "Classic T-Shirt Collection",
                                "image_url": "http://topit-static.vietnamworks.com/companies/wp-content/uploads/2016/06/KMS-logo-1.png",
                                "subtitle": "See all our colors",
                                "default_action": {
                                    "type": "web_url",
                                    "url": "http://careers.kms-technology.com/job/software-architect-strong-front-end",
                                    "messenger_extensions": true,
                                    "webview_height_ratio": "tall",
                                    "fallback_url": "http://careers.kms-technology.com/job/software-architect-strong-front-end"
                                },
                                "buttons": [
                                    {
                                        "title": "View",
                                        "type": "web_url",
                                        "url": "http://careers.kms-technology.com/job/software-architect-strong-front-end",
                                        "messenger_extensions": true,
                                        "webview_height_ratio": "tall",
                                        "fallback_url": "http://careers.kms-technology.com/job/software-architect-strong-front-end"
                                    }
                                ]
                            },
                            {
                                "title": "Classic White T-Shirt",
                                "image_url": "https://media.glassdoor.com/sqll/429755/kms-technology-squarelogo.png",
                                "subtitle": "100% Cotton, 200% Comfortable",
                                "default_action": {
                                    "type": "web_url",
                                    "url": "http://careers.kms-technology.com/job/senior-oc-executive",
                                    "messenger_extensions": true,
                                    "webview_height_ratio": "tall",
                                    "fallback_url": "http://careers.kms-technology.com/job/senior-oc-executive"
                                },
                                "buttons": [
                                    {
                                        "title": "Shop Now",
                                        "type": "web_url",
                                        "url": "http://careers.kms-technology.com/job/senior-oc-executive",
                                        "messenger_extensions": true,
                                        "webview_height_ratio": "tall",
                                        "fallback_url": "http://careers.kms-technology.com/job/senior-oc-executive"
                                    }
                                ]
                            },
                            {
                                "title": "Casdasdasd",
                                "image_url": "https://media.glassdoor.com/sqll/429755/kms-technology-squarelogo.png",
                                "subtitle": "100% Cotton, 200% Comfortable",
                                "default_action": {
                                    "type": "web_url",
                                    "url": "http://careers.kms-technology.com/job/senior-oc-executive",
                                    "messenger_extensions": true,
                                    "webview_height_ratio": "tall",
                                    "fallback_url": "http://careers.kms-technology.com/job/senior-oc-executive"
                                },
                                "buttons": [
                                    {
                                        "title": "Shop Now",
                                        "type": "web_url",
                                        "url": "http://careers.kms-technology.com/job/senior-oc-executive",
                                        "messenger_extensions": true,
                                        "webview_height_ratio": "tall",
                                        "fallback_url": "http://careers.kms-technology.com/job/senior-oc-executive"
                                    }
                                ]
                            },
                        ],
                        "buttons": [
                            {
                                "title": "View More",
                                "type": "postback",
                                "payload": "payload"
                            }
                        ]
                    }
                }
            }
        },
        "contextOut": [],
        "source": "agent"
    }
    res.json(responseData)
})
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Our app is running on port ' + port);
})
