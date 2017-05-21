const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/test/:testName/arguments', (req, res) => {
    const { testName } = req.params;

    res.send(['save', 'save-dev', 'f', 'g']);
});

app.get('/test/:testName', (req, res) => {
    res.json({
        testName: req.params.testName,
        arguments: [
            {
                names: [
                    { key: 'save', value: 'value1' },
                    { key: 'save-dev', value: 'value2' }
                ],
                hash: 'uhanothun',
                statuses: {
                    failed: [
                        {
                            verdict: 'no verdict',
                            logs_uri: ['https://ya.ru', 'https://google.com']
                        }
                    ],
                    succeded: [
                        {
                            verdict: 'no verdict',
                            logs_uri: ['https://ya.ru', 'https://google.com']
                        }
                    ]
                }
            }
        ]
    });
});

app.listen(3334, () => console.log('Listening'));
