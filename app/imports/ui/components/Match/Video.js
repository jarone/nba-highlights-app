import React, { Component, PropTypes } from 'react';

export class Video extends Component {
	render(){
		return (
			<div>
				<video width='640' height='360' controls preload='none' poster={this.props.poster}>
					<source src={this.props.video} type='video/mp4' />
				</video>
			</div>
		)}
};
