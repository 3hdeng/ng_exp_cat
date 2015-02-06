/*
 * GET home page.
 */
var express = require('express');
var router = express.Router();

exports.index = function (req, res) {
    res.render('index.html');
};

exports.partials = function (req, res) {
    var name = req.params.name;
    /*if (name == 'phones') {
        var db = req.db;
        var collection = db.get('phones');
        collection.find({}, {}, function (e, docs) {
            res.render('partials/phones', {
                "phones": docs
            });
        });
    } else
    */
   console.log(name);
   res.render('partials/' + name);
};

