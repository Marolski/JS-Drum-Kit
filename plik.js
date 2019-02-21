var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/',function(req, res){
    res.render('index-START.ejs');
});

app.listen(3000, function(){
    console.log('przykladowa apka na porcie 3000');
});