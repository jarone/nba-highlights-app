import {Row, Col} from 'react-bootstrap';
import React, { Component, PropTypes } from 'react';

export class MatchBox extends Component {
	constructor(props) {
    super(props);

    this.state = {
      isSelected:false
    };
  }

	render(){
    const teamAway = this.props.match.teams.away;
    const teamHome = this.props.match.teams.home;
		const imgAway = teamAway.img;
		const imgHome = teamHome.img;

		const scoreAway = teamAway.score;
		const scoreHome = teamHome.score;

		const nameAway = teamAway.name;
		const nameHome = teamHome.name;

		return (
				<Row xs={4} className='matchBox'>
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

MatchBox.propTypes = {
  match: React.PropTypes.object
};
