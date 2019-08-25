import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '50%',
  height: '50%',
  marginBottom: '50px'
};

class MonsterMap extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    };


    render() {
      const {locations} = this.props;

        return (

          <div className="MonsterMap">
                  <Map
        google={this.props.google}
        zoom={10}
        style={mapStyles}
        initialCenter={{
         lat: 32.7157,
         lng: -117.1611
        }}>

         {this.props.locations.map(function(location, i){
              const newLocation = location.split(",");
              console.log(newLocation);
              const newLat = newLocation[0];
              console.log("newLAT", newLat);
              const newLang = newLocation[1]; 
              return <Marker key={i} position={{lat: newLat, lng: newLang}}/>;
        })}

      </Map>
          </div>
        )
    }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyDL7Ocl912juUGpT-lmjoktDeFMO6cNrRE'
})(MonsterMap);



