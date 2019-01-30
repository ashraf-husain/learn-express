
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
var now = new Date().toString();

var log = `${now} ${req.method} ${req.url}`;

console.log(log);
fs.appendFile('server.log', log + '\n',(error) => {
if(error) {
    console.log('unable to append to server.log');
}
});
 next();
})

// app.use((req, res, next) => {
//  res.render('maintanance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() => {
   return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(Text) => {
    return Text.toUpperCase();
})

app.get('/',(req,res) => {
res.render('home.hbs',{
    welcomeMessage: 'welcome to my website',
    pageTitle: 'home page',
})
});

app.get('/about',(req,res) => {
    res.render('about.hbs', {
        pageTitle: 'about page',
    });
});

app.get('/bad',(req,res) => {
    res.send({
        errorMessage: 'unable to process the request'
    })
})

app.listen(4000,() =>{
    console.log('server is upto on port 4000');
});
