var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var mongoose = require('mongoose');
var fs = require('fs');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.port || 3000);
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

mongoose.connect('mongodb://localhost/merchants');

var merchScheme = new mongoose.Schema({
    merch_id : String,
    name: String,
    distance : String,
    rating : String,
    time : Number,
    cuisines : String
});

var merchModel = mongoose.model('scraps', merchScheme);

app.route("/sign")

    .get(function(req, res){
        var token = "client_id=YmYxMmEzOGFiMWQwODczM2NkMzI1MGQ2Mjk1NzcyYTNl";
        var redirect = "redirect_uri=http://localhost:3000/client";
        var response = "response_type=code";
        var scope = "scope=global";
        var state = "state=app";
        var url = "http://sandbox.delivery.com/third_party/authorize?" + token + "&" + redirect + "&" + response + "&" + scope + "&" + state;

        request(url, function(err, res, body){
            console.log(url);
        });
        res.send("hello world");
    });


// This route collects the Oauth access token, then uses that token to search for a user's location
// Using that user's location we then search for the merchant locations and send them to the FE as JSON
app.route("/search")
    .get(function(req, resf){

        //var token = req.query.code;
        var token = 'lNypHJ4T9XV0ru6IrA8IzxyiNiiLxEn2twPsqrn7'
        var options = {
            url : 'https://sandbox.delivery.com/customer/location?client_id=YmYxMmEzOGFiMWQwODczM2NkMzI1MGQ2Mjk1NzcyYTNl',
            headers : {
                'Authorization' : token

            }
        }
        request(options, function(err, res, loc){
            // var quick2 = JSON.parse(loc);

            var data = JSON.parse(loc);
            //var longt = 'longitude=' + data.locations[0].longitude;
            //var lat = 'latitude=' + data.locations[0].latitude;
            var longt = 'longitude=-73.986110';
            var lat = 'latitude=40.693508';

            var mechOpts = {
                url : 'http://sandbox.delivery.com/merchant/search/delivery?' + lat + '&' + longt,
                headers : {
                'Authorization' : token
                }
            }

            request(mechOpts, function(err, resp, merch){
                try {
                var gotMerch = JSON.parse(merch);
                } catch(err) {
                    console.log(err);
                    return false;
                }
                var count = (Object.keys(gotMerch.merchants).length);
                for(var i=0;i<count;i++) {

                    var id = gotMerch.merchants[i].id;
                    var name = gotMerch.merchants[i].summary.name;
                    var distance = gotMerch.merchants[i].location.distance;
                    var rating = gotMerch.merchants[i].summary.overall_rating;
                    var cuisine = gotMerch.merchants[i].summary.cuisines;

                            var storeMerch = new merchModel({
                                merch_id : id,
                                name : name,
                                distance : distance,
                                rating : rating,
                                cuisines : cuisine
                            }).save(function(pro, storeMerch){
                                if(pro) {
                                    console.log(err);
                                }
                            });
                }
                resf.send(gotMerch);

            });

        });
    });

app.route('/menu/:id')
    .get(function(req, res){
        var id = req.params.id;

        var url = 'http://sandbox.delivery.com/merchant/' + id + '/menu?item_only=1';

        request(url, function(err, resp, menu){
            var pMenu = JSON.parse(menu);
            res.send(pMenu);
        });
    });

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = app.listen(3000, function(){
    console.log(server.address().port + ' is where the magic happens');
});

module.exports = app;
