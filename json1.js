/**
 * Created with mean1.
 * User: 3hdeng
 * Date: 2015-01-26
 * Time: 04:33 AM
 * To change this template use Tools | Templates.
 */
//var fnames = ['app/phones/dell-venue.json', 'app/phones/lg-axis.json', 'app/phones/motorola-xoom-with-wi-fi.json'];
var fs = require('fs');
var fnames = [];
var dir = 'phones/'
var files = fs.readdirSync(dir);
for(var i in files) {
    if(!files.hasOwnProperty(i)) continue;
    var name = dir + files[i];
    if(files[i].indexOf('.json') >= 0 && !fs.statSync(name).isDirectory()) {
        fnames.push(name);
    }
}
console.log(fnames);
var MongoClient = require('mongodb').MongoClient;
// Connect to the db
MongoClient.connect("mongodb://localhost:27017/expApp2", function(err, db) {
    if(err) {
        return console.dir(err);
    } else {
        console.log("We are connected");
        var collection = db.collection('phones');
        var ret = [];
        for(var i = 0; i < fnames.length; i++) {
            //ret.push(fs.readFileSync(fnames[i], 'utf8'));
            ret.push(JSON.parse(fs.readFileSync(fnames[i], 'utf8')));
            collection.insert(ret[i], { w: 1 }, function(err, result) {
                if(err) console.log(err);
            });
            console.log(ret[i]) ;
        }
        // console.log(ret);
        MongoClient.close();
    }
});
