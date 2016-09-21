import { Row, Col } from 'react-bootstrap';
import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import { Video } from './Match/Video';
import { MatchBox } from './Match/MatchBox';

export class MatchSelector extends Component {
	constructor(props) {
    super(props);

    this.state = {
      playlist: []
    };
  }

	playlistController(video, action) {
		let playlist = this.state.playlist;
		if(action == 'add') {
				playlist.push(video);
		} else if(action == 'remove') {
			const removeIndex = _.indexOf(playlist, video);
			if(removeIndex != -1) {
				playlist.splice(removeIndex, 1);
			}
		}
		this.setState({
			playlist: playlist
		})
	}

	render(){
		console.log(_.size(this.state.playlist));
		const boxes = _.map(this.props.matches, (match, k) => {
			return (<MatchBox key={'box-'+ k}
												match={match}
												playlistController={this.playlistController.bind(this)}
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
