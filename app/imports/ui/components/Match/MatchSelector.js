import { Row, Col } from 'react-bootstrap';
import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import { MatchBox } from './MatchBox';

export class MatchSelector extends Component {
	constructor(props) {
    super(props);
  }

	render(){
		const boxes = _.map(this.props.matches, (match, k) => {
			return (<MatchBox key={'box-'+ k}
												match={match}
												onSelect={this.props.onSelectAction.bind(this)}
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
