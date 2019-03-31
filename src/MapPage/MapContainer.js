import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {GoogleMap, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';
import Select from '@material-ui/core/Select';



class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    fakeData: [
      {"latitude": 34.05070114135742,
      "longitude": -118.420,
       "day": 25,
      "week":100,
      "month":500},

      {"latitude": 34.0523,
      "longitude": -118.4205,
       "day": 20,
      "week":105,
      "month":600},

      {"latitude": 34.0526,
      "longitude": -118.419,
       "day": 10,
      "week":101,
      "month":570}
    ],
    isOpen: {},
    centerLat: this.props.centerLat,
    centerLng: this.props.centerLng,
    houseData: this.props.houseData
  }
}
  onToggleOpen = (id) => {
    this.setState({
      isOpen: {...this.state.isOpen, [id]: !this.state.isOpen[id]}
    });
  };

/*
  componentDidUpdate(prevProps){
    // Typical usage (don't forget to compare props):
    if (this.props.houseData !== prevProps.houseData) {
      this.setState({
        houseData:this.props.houseData
      })
    }
  } */ 

  componentWillReceiveProps(nextProps) {
    // Any time props.email changes, update state.
    if (nextProps.houseData !== this.props.houseData) {
      this.setState({
        houseData: nextProps.houseData
      });
    }
  }

  render() {

    var heights = [];
    var heightCoordinates = this.state.houseData.map((house, index) => {
      heights[index]=house.day;
      return heights[index];
    })

    var max = 0;
    for(var i=0;i<heights.length; i++)
    {
      if(max< heights[i])
      {
        max = heights[i];
      }
    }
    
    var workingCoordinates = []
    var newCoordinates = this.state.houseData.map((house, index) => {
      workingCoordinates[index] = {
      "height": house.day/max,
      "latitude": house.latitude,
      "longitude": house.longitude,
      "day": house.day,
      "week": house.week,
      "month": house.month
        };
      return workingCoordinates[index];
    })
/*
    refreshHouseData = res => this.setState({ houseData: res.data.shoes })


    componentWillReceiveProps(props) {
      const { houseData, id } = this.props;
      if (props.houseData !== houseData) {
        this.fetchShoes(id)
          .then(this.refreshShoeList)
      }


componentWillReceiveProps(props) {
  this.setState({houseData: props.houseData})
}
*/


    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: this.state.centerLat, lng: this.state.centerLng } }
        defaultZoom = { 12 }
        defaultOptions={{
          disableDefaultUI: true, // disable default map UI
          draggable: false, // make map draggable
          keyboardShortcuts: false, // disable keyboard shortcuts
          scaleControl: false, // allow scale controle
          scrollwheel: false,
          zoomControl: false,
        }}
        
      >
         {workingCoordinates.map((home, index) => {
            return <Marker position={{lat: home.latitude, lng: home.longitude}}
            icon = {{url: "http://www.clker.com/cliparts/Z/w/m/h/m/A/light-blue-rounded-square.svg.hi.png",
            scaledSize: {width: 16, height: 50*home.height},}}
            onClick = {()=>this.onToggleOpen(index)}
            >
            {this.state.isOpen[index] && <InfoWindow onCloseClick = {() =>this.onToggleOpen(index)}>
            <div>
                {home.day}
            </div>
            </InfoWindow>}
            </Marker>;
            })
          }
          

      </GoogleMap>

   ));
   console.log(this.state.houseData)
   console.log(workingCoordinates)

    return (
    <div>
        <Select/>
        <GoogleMapExample
          containerElement={ <div style={{ height: `700px`, width: '700px' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        >

        </GoogleMapExample>

      </div>
    );
  }
};

MapContainer.propTypes = {
  centerLat: PropTypes.number.isRequired,
  centerLng: PropTypes.number.isRequired,
};
 
export default MapContainer

