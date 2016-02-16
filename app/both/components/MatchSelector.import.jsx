import {Row, Col} from 'bootstrap';

export default React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		let data = {};
		// This is the place to subscribe to any data you need
		const handle = Meteor.subscribe('matches');
		if(handle.ready()) {
			data.matches = Matches.find().fetch();
		}
		return data;
	},
	render(){
		console.log(this.data.matches);
		let videos = _(this.data.matches).map(function(match, k){
			return (<Video key={k} match={match}> hey </Video>);
		});
		return(
			<div>
				{videos}
			</div>
		)
	}
});


MatchBox = React.createClass({
	getInitialState(){
		return {
			isSelected:false
		}
	},


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
});

Video = React.createClass({
	render(){
		return (
			<div>
				<video width="640" height="360" controls preload="none" poster={this.props.poster}>
					<source src={this.props.video} type="video/mp4" />
				</video>
			</div>
		)}
});