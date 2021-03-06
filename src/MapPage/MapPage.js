import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import MapContainer from './MapContainer';
import PropTypes from 'prop-types';
import RankBoard from './RankBoard';

const getURL = 'http://lahacks.appspot.com/api/fetchwater'
const proxyurl = "https://cors-anywhere.herokuapp.com/";


const throwError = async (resp) => {
    const unknownErr = { errorMessage: 'Unknown error' };
    try {
        const body = await resp.json();
        if (body.message !== undefined) {
            let err = { errorMessage: body.message };
            throw err;
        } else {
            throw unknownErr;
        }
    } catch (e) {
        throw unknownErr;
    }
};

class MapPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            houseData: [ {"latitude": 34.0522,
            "longitude": -118.420,
             "day": 25,
            "week":100,
            "month":500} ]
        };
    }
    parseLat(path) {
        var result = '';
        for (var i = 5; i < path.length; i++) {
            if (path[i] === '/') {
                break;
            }
            result += path[i];
        }
        return result;
    }

    parseLng(path) {
        return path.substr(path.indexOf("/", 5) + 1);
    }
    componentDidMount() {
        this.loadData();
    }
    async loadData() {
        const response = await fetch(proxyurl + getURL, {
            method: "POST",
            body: JSON.stringify({
                lat1: 30.060,
                lat2: 44.050,
                long1: -100.410,
                long2: -150.43
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throwError(response);
        }
        const data = await response.json();
        console.log(data);
        this.setState({ 
            houseData: data.results 
        });

    }
/*
    refreshHouseData = () => 
    this.setState({refreshHouseData: !this.state.refreshHouseData})
*/
    render() {
        const url = this.props.history.location;
        const myLat = parseFloat(this.parseLat(url.pathname));
        const myLng = parseFloat(this.parseLng(url.pathname));
        console.log({myLat});
        console.log({myLng});
        return (
            <div>
            <MapContainer
            centerLat = {myLat} 
            centerLng = {myLng}
            houseData = {this.state.houseData}
            />
            </div>
        );
    }
}

withRouter(MapPage);
export default MapPage;