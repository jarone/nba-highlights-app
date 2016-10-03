"use strict"
const mongoose = require('mongoose');
const Nightmare = require('nightmare');
const rp = require('request-promise');
const _ = require('lodash');

const BASE_URL = 'http://global.nba.com';

const getTeamImg = (team) => {
  return BASE_URL + '/media/img/teams/logos/' + team + '_logo.svg';
}

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const matchSchema = mongoose.Schema({
  teams: {
    home:{
        score: String,
        name: String,
        img: String
    },
    away:{
        score: String,
        name: String,
        img: String
    }
  },
  highlights_page_link: String,
  video: String,
  date: Number
});

const Match = mongoose.model('Match', matchSchema);

//get dayly json file for the games
const options = {
    uri: `${BASE_URL}/statsm2/scores/daily.json?gameDate=2016-10-01`,
    json: true // Automatically parses the JSON string in the response
};

rp(options)
    .then((nbaInfo) => {
        const games = nbaInfo.payload.date.games;
        const gamesInfo = [];
        if(!_.isEmpty(games)) {
              _.forEach(games, (game) => {
                if(!_.isEmpty(game.urls)) {
                  let highLightsPageLink = null;
                  _.forEach(game.urls, (url) => {
                    if(_.toLower(url.type) == 'highlights') {
                      highLightsPageLink = url.value
                    }
                  })

                  const scoreHome = game.homeTeam.score.score;
                  const teamHome = game.homeTeam.profile.abbr;

                  const scoreAway = game.awayTeam.score.score;
                  const teamAway = game.awayTeam.profile.abbr;

                  const utcMillis = game.profile.utcMillis;
                  const gameInfo = {
                      teams:{
                          home:{
                              score: scoreHome,
                              name: teamHome,
                              img: getTeamImg(teamHome)
                          },
                          away:{
                              score: scoreAway,
                              name: teamAway,
                              img: getTeamImg(teamAway)
                          }

                      },
                      highlights_page_link: highLightsPageLink,
                      date: utcMillis
                  }
                  gamesInfo.push(gameInfo);
                }
            });
        }

        //nightmare stuff
        const nightmare = Nightmare();
        gamesInfo.reduce((accumulator, gameInfo) => {
              return accumulator.then((results) => {
                return nightmare
                  .goto(gameInfo.highlights_page_link)
                  .wait(5000)
                  .evaluate(() => {
                      let videoLink = document.querySelector('video');
                      if(videoLink) videoLink = videoLink.getAttribute('src');
                      else videoLink = null;
                      return videoLink
                  }).then((videoLink) => {
                    gameInfo.video = videoLink
                    results.push(gameInfo);
                    const m = new Match(gameInfo);
                    m.save((err) => {
                      if (err) return err;
                      console.log("Match saved");
                    });
                    return results
                  })
                  .catch((error) => {
                    console.error('Failed:', error);
                  });
              });
            }, Promise.resolve([])).then((results) => {
                console.dir(results);
                nightmare.end().then();
            });
    })
    .catch(function (err) {
      console.log(err);
    });
