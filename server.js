const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/test/:testName/arguments', (req, res) => {
    res.send(['save', 'save-dev', 'f', 'g']);
});

app.get('/test/:testName', (req, res) => {
    res.json({
        testName: req.params.testName,
        arguments: [
            {
                names: [
                    { key: 'bind_to_vlan', value: 'TRUE' },
                    { key: 'create_vlan', value: 'TRUE' },
                    { key: 'env', value: 'VAR.env.peer2peer' }
                ],
                hash: '774b440c75b54ac87429a620077025b1',
                statuses: {
                    failed: [
                        {
                            verdict: 'no verdict',
                            logs_uri: ['https://ya.ru', 'https://oktetlabs.ru/~tester-l5/night-testing/Linux-v5_tot/16.04/session_16.04.22/22.40-l5elrond-ul32-4.5.0-1-686-pae-small_spin-phys_mode-loop4-tcp_no_delack-default_epoll-fdtable_strict-socket_cache-!EPOLL-REST/html/node_27333.html']
                        },
                        {
                            verdict: 'another verdict',
                            logs_uri: ['https://ya.ru', 'https://google.com', 'http://anothersite.com']
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
