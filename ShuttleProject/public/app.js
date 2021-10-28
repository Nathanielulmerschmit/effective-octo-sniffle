var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sent('index.html')
})

app.listen(3000, () => {
    console.log('listening on port 3000!');
})


