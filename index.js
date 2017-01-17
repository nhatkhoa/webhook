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
                                "image_url": "https://peterssendreceiveapp.ngrok.io/img/collection.png",
                                "subtitle": "See all our colors",
                                "default_action": {
                                    "type": "web_url",
                                    "url": "https://peterssendreceiveapp.ngrok.io/shop_collection",
                                    "messenger_extensions": true,
                                    "webview_height_ratio": "tall",
                                    "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                                },
                                "buttons": [
                                    {
                                        "title": "View",
                                        "type": "web_url",
                                        "url": "https://peterssendreceiveapp.ngrok.io/collection",
                                        "messenger_extensions": true,
                                        "webview_height_ratio": "tall",
                                        "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                                    }
                                ]
                            }, {
                                "title": "Classic White T-Shirt",
                                "image_url": "https://peterssendreceiveapp.ngrok.io/img/white-t-shirt.png",
                                "subtitle": "100% Cotton, 200% Comfortable",
                                "default_action": {
                                    "type": "web_url",
                                    "url": "https://peterssendreceiveapp.ngrok.io/view?item=100",
                                    "messenger_extensions": true,
                                    "webview_height_ratio": "tall",
                                    "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                                },
                                "buttons": [
                                    {
                                        "title": "Shop Now",
                                        "type": "web_url",
                                        "url": "https://peterssendreceiveapp.ngrok.io/shop?item=100",
                                        "messenger_extensions": true,
                                        "webview_height_ratio": "tall",
                                        "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                                    }
                                ]
                            }, {
                                "title": "Classic Blue T-Shirt",
                                "image_url": "https://peterssendreceiveapp.ngrok.io/img/blue-t-shirt.png",
                                "subtitle": "100% Cotton, 200% Comfortable",
                                "default_action": {
                                    "type": "web_url",
                                    "url": "https://peterssendreceiveapp.ngrok.io/view?item=101",
                                    "messenger_extensions": true,
                                    "webview_height_ratio": "tall",
                                    "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                                },
                                "buttons": [
                                    {
                                        "title": "Shop Now",
                                        "type": "web_url",
                                        "url": "https://peterssendreceiveapp.ngrok.io/shop?item=101",
                                        "messenger_extensions": true,
                                        "webview_height_ratio": "tall",
                                        "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                                    }
                                ]
                            }, {
                                "title": "Classic Black T-Shirt",
                                "image_url": "https://peterssendreceiveapp.ngrok.io/img/black-t-shirt.png",
                                "subtitle": "100% Cotton, 200% Comfortable",
                                "default_action": {
                                    "type": "web_url",
                                    "url": "https://peterssendreceiveapp.ngrok.io/view?item=102",
                                    "messenger_extensions": true,
                                    "webview_height_ratio": "tall",
                                    "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                                },
                                "buttons": [
                                    {
                                        "title": "Shop Now",
                                        "type": "web_url",
                                        "url": "https://peterssendreceiveapp.ngrok.io/shop?item=102",
                                        "messenger_extensions": true,
                                        "webview_height_ratio": "tall",
                                        "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                                    }
                                ]
                            }
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
