import React from 'react';
import Map, {GoogleApiWrapper} from 'google-maps-react';
import {searchNearby} from 'utils/googleApiHelpers';
import Header from 'components/Header/Header';

export class Container extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			places: [],
			pagination: null
		}
	}
	onReady(mapProps, map) {
		const {google} = this.props;
		const opts = {
			location: map.center,
			radius: '500',
			types: ['cafe']
		};

		searchNearby(google, map, opts)
			.then((results, pagination) => {
				this.setState({
          			places: results,
          			pagination
        		});
			}).catch((status, results) => {

			});
	}
	render() {
		return (
			<div>
				Hello from the container
				<Map
				visible={false}
				onReady={this.onReady.bind(this)}
				google={this.props.google}>
					<Header />
					{this.state.places.map(place => {
            			return (<div key={place.id}>{place.name}</div>);
         	 		})}
				</Map>
			</div>
		);
	}
};

export default GoogleApiWrapper({
	apiKey: __GAPI_KEY__
})(Container);