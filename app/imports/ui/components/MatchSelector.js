import { Row, Col } from 'react-bootstrap';
import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import { Video } from './Match/Video';

export class MatchSelector extends Component {
	render(){
		const videos = _.map(this.props.matches, (match, k) => {
			return (<Video video={match.video} key={'video-'+ k}/>);
		});
		return(
			<div>
				{videos}
			</div>
		)
	}
};

MatchSelector.propTypes = {
	loading: React.PropTypes.bool,
  listExists: React.PropTypes.bool,
  matches: React.PropTypes.array
};
