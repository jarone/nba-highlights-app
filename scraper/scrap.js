// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var matchSchema = mongoose.Schema({
  teams: {
    'home':{
        'score': String,
        'name': String,
        'img': String
    },
    'away':{
        'score': String,
        'name': String,
        'img': String
    }
  },
  video: String,
  date: Number
});

var Match = mongoose.model('Match', matchSchema);


var Nightmare = require('nightmare');
var path = require('path');
var vo = require('vo');

var x = Date.now();

//WITH GENERATORS
vo(run)(function(err, result) {
  if (err) console.log(err);
});

console.log('what up');

function *run() {
  var nightmare = Nightmare({});
  var info = yield nightmare
    .goto('http://www.nba.com')
     .wait(5000)
    .click('#global-nav-1 a')
     .wait(5000)
    .evaluate(function() {

        var rawDate = document.querySelector('.day .date').innerText;
        var currentYear = new Date().getFullYear();
        var date = new Date(rawDate + ' ' + currentYear).getTime();
       var elements = document.querySelectorAll('.gamestrip .day .tile.final a.gameinfo');

       var hrefs = [];
       for (var i = 0, len = elements.length; i < len; i++) {
            hrefs[i] = elements[i].getAttribute('href')
        }
       return {'links':hrefs, 'date':date}

    });

    var links = info.links;
  console.log(info);

  for(var a=0, len = links.length; a < len; a++){

    var matches = [];
    var data = yield nightmare
            .goto('http://www.nba.com'+links[a])
            .wait(5000) //TODO for some reason it does not want to evaluate again here. Not launching Electron app the way it used to...
            .evaluate(function() {

                var scoreAway = document.querySelector('.teamAway').innerText;
                var scoreHome = document.querySelector('.teamHome').innerText;

                var teamHome = document.querySelector('.nbaGIAwayT p').innerText;
                var teamAway = document.querySelector('.nbaGIHomeT p').innerText;

                var imgHome = document.querySelector('.nbaGIAwayT img').getAttribute('src'); //'.Final .nbaGIAwayT img' --> get normal pic
                var imgAway = document.querySelector('.nbaGIHomeT img').getAttribute('src');

                var videoLink = document.querySelector('video');
                if(videoLink) videoLink = videoLink.getAttribute('src'); //On the electron browser it appears in a video tag instead of an object tag
                else videoLink = null;

                var gameInfo={
                    'teams':{
                        'home':{
                            'score': scoreHome,
                            'name': teamHome,
                            'img': imgHome
                        },
                        'away':{
                            'score': scoreAway,
                            'name': teamAway,
                            'img': imgAway
                        }

                    },
                    'video': videoLink
                }
                return gameInfo
            })

        data.date = info.date;
        var m = new Match(data);
        m.save(function (err) {
          if (err) {
            return err;
          }
          else {
            console.log("Match saved");
          }
        });
        console.log(data);

  }


  yield nightmare.end();
  console.log('we finished');

  //TODO kill child processes --> solution install npm as non root
  // var proc = require('child_process').spawn(path.join(__dirname, "node_modules/nightmare/lib/runner.js")); //this kills remaining child processes a.k.a electron
  // process.on('exit', function(){
      // proc.kill('SIGINT');
  // });

  //process.exit(); //TODO delay the execution to allow th elast match to be saved

}
