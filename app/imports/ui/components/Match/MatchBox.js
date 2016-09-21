import {Row, Col} from 'react-bootstrap';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export class MatchBox extends Component {
	constructor(props) {
    super(props);

    this.state = {
      isSelected: false
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

		const matchClass = classNames(
			'scoreboard', {
				selected: this.state.isSelected
			}
		)

		return (
				<Col md={6} className={'match-box'}>
					<Row className={matchClass}>
						<Col md={5} className='team-left'>
							<Row>
									<Col md={7}>
										<div className='box'>
											<img src={imgAway}/>
											<div>
												{nameAway}
											</div>
										</div>
									</Col>
									<Col md={5} className='score'>
										<div>{scoreAway}</div>
									</Col>
							</Row>
						</Col>
						<Col md={2} className='divider'>
								|
						</Col>
						<Col md={5} className='team-right'>
							<Row>
									<Col md={5} className='score'>
										<div>{scoreHome}</div>
									</Col>
									<Col md={7}>
										<div className='box'>
											<img src={imgHome}/>
											<div>
												{nameHome}
											</div>
										</div>
									</Col>
							</Row>
						</Col>
					</Row>
				</Col>
		)}
};

MatchBox.propTypes = {
  match: React.PropTypes.object
};
