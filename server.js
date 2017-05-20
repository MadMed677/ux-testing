const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({
        status: 'success'
    });
});

app.listen(3333, () => console.log('Listening'));
