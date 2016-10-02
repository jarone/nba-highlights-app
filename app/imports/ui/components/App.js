import React, { Component } from 'react';

import { MatchSelector } from './Match/MatchSelector';
import { PlaylistCreator } from './Playlist/PlaylistCreator';

export class App extends Component {
	constructor(props) {
    super(props);

    this.state = {
      selectedVideos: []
    };
  }

	onSelectAction(video, action) {
		let selectedVideos = this.state.selectedVideos;
		if(action == 'add') {
				selectedVideos.push(video);
		} else if(action == 'remove') {
			const removeIndex = _.indexOf(selectedVideos, video);
			if(removeIndex != -1) {
				selectedVideos.splice(removeIndex, 1);
			}
		}
		this.setState({
			selectedVideos
		})
	}

	render(){
		return(
      <div>
        <MatchSelector
          matches={this.props.matches}
          onSelectAction={this.onSelectAction.bind(this)}/>
        <PlaylistCreator videos={this.state.selectedVideos}/>
      </div>
    )
	}
};
