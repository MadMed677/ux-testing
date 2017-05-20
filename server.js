const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/', (req, res) => {
    res.json({
        status: 'success',
        parameters: ['save', 'save-dev', 'something else']
    });
});

app.listen(3334, () => console.log('Listening'));
