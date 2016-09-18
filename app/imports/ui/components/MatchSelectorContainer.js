import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Matches } from '/imports/api/matches.js';
import { MatchSelector } from './MatchSelector';

export const MatchSelectorContainer = createContainer(() => {
  const matchesHandle = Meteor.subscribe('matches');
  const loading = !matchesHandle.ready();
  const matches = Matches.find();
  const matchesExists = !loading && !!matches;
  return {
    loading,
    matchesExists,
    matches: matchesExists ? matches.fetch() : {},
  };
}, MatchSelector);
