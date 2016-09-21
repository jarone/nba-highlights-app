import { Row, Col } from 'react-bootstrap';
import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import { Video } from './Match/Video';
import { MatchBox } from './Match/MatchBox';

export class MatchSelector extends Component {
	render(){
		const boxes = _.map(this.props.matches, (match, k) => {
			return (<MatchBox key={'box-'+ k}
												match={match}
												/>);
		});
		return(
			<Row>
				{boxes}
			</Row>
		)
	}
};

MatchSelector.propTypes = {
	loading: React.PropTypes.bool,
  listExists: React.PropTypes.bool,
  matches: React.PropTypes.array
};
