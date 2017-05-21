const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/test/:testName/arguments', (req, res) => {
    const { testName } = req.params;

    res.send(['save', 'save-dev', 'f', 'g']);
});

app.listen(3334, () => console.log('Listening'));
