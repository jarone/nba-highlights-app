import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Matches = new Mongo.Collection('matches');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('matches', function matchesPublication() {
    return Matches.find();
  });
}
