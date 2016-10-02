import { Row, Col, Button } from 'react-bootstrap';
import React, { Component, PropTypes } from 'react';
import _ from 'lodash';


export class PlaylistCreator extends Component {
	constructor(props) {
    super(props);

    this.state = {
      // displayPlaylist: false
    };
  }

	createPlaylist() {
		console.log(this.props.videos);
	}

  render() {
    let content = null;
  	if(!_.isEmpty(this.props.videos)) {
  		content = (
  			<Row className='create-playlist'>
  	      <Col xs={12}>
            <div>
    	       <Button
    	          bsSize='large'
    	          onClick={this.createPlaylist.bind(this)}
    	        >
    	          Create Playlist!
    	        </Button>
            </div>
  	      </Col>
  	    </Row>
  		);
  	}
    return (
      <div>
          {content}
      </div>
    )
  }
}
