import {Row, Col} from 'react-bootstrap';
import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

export class MatchSelector extends Component {
	render(){
		const videos = _(this.props.matches).map((match, k) => {
			return (<Video key={k} match={match} />);
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
  mathces: React.PropTypes.object
};

class MatchBox extends Component {
	constructor(props) {
    super(props);

    this.state = {
      isSelected:false
    };
  }

	render(){
		const imgAway = this.props.match.teams.away.img;
		const imgHome = this.props.match.teams.home.img;

		const scoreAway = this.props.match.teams.away.score;
		const scoreHome = this.props.match.teams.home.score;

		const nameAway = this.props.match.teams.away.name;
		const nameHome = this.props.match.teams.home.name;

		return (
				<Row xs={4} className="matchBox">
					<div>
						<Col xs={3}>
							<img src={imgAway}/>
						</Col>
						<Col xs={3}>
							<div>{scoreAway}</div>
						</Col>
						<Col xs={3}>
							<img src={imgHome}/>
						</Col>
						<Col xs={3}>
							<div>{scoreHome}</div>
						</Col>
					</div>
				</Row>
		)}
};

class Video extends Component {
	render(){
		return (
			<div>
				<video width="640" height="360" controls preload="none" poster={this.props.poster}>
					<source src={this.props.video} type="video/mp4" />
				</video>
			</div>
		)}
};
