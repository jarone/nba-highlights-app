import { Meteor } from 'meteor/meteor';
import { Matches } from '/imports/api/matches.js';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (Matches.find().count() === 0) {
    const data = [
      {
        teams: {
          'home':{
              'score': '118',
              'name': 'Rockets',
              'img': 'http://i.cdn.turner.com/nba/nba/.element/img/2.0/sect/gameinfo/teamlogos/HOU.gif'
          },
          'away':{
              'score': '110',
              'name': 'Thunder',
              'img': 'http://i.cdn.turner.com/nba/nba/.element/img/2.0/sect/gameinfo/teamlogos/OKC.gif'
          }
        },
        video: 'http://nba.cdn.turner.com/nba/big/games/rockets/2016/04/03/0021501145-okc-hou-recap.nba_1280x720.mp4',
        date: (new Date()).getTime()
      },
    {
      teams: {
        'home':{
            'score': '112',
            'name': 'Cavaliers',
            'img': 'http://i.cdn.turner.com/nba/nba/.element/img/2.0/sect/gameinfo/teamlogos/CLE.gif'
        },
        'away':{
            'score': '103',
            'name': 'Hornets',
            'img': 'http://i.cdn.turner.com/nba/nba/.element/img/2.0/sect/gameinfo/teamlogos/CHA.gif'
        }
      },
      video: 'http://nba.cdn.turner.com/nba/big/games/cavaliers/2016/04/03/0021501144-cha-cle-recap.nba_1280x720.mp4',
      date: (new Date()).getTime()
    },
    {
      teams: {
        'home':{
            'score': '87',
            'name': 'Knicks',
            'img': 'http://i.cdn.turner.com/nba/nba/.element/img/2.0/sect/gameinfo/teamlogos/NYK.gif'
        },
        'away':{
            'score': '92',
            'name': 'Pacers',
            'img': 'http://i.cdn.turner.com/nba/nba/.element/img/2.0/sect/gameinfo/teamlogos/IND.gif'
        }
      },
      video: 'http://nba.cdn.turner.com/nba/big/games/knicks/2016/04/03/0021501151-ind-nyk-recap.nba_1280x720.mp4',
      date: (new Date()).getTime()
    }
    ]

    data.forEach((match) => {
        Matches.insert(match);
    })
  }
});
