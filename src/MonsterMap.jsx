import React, { Component } from 'react';
import './App.css';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '50%',
  height: '50%',
  marginLeft: '40px'
};

function MonsterMap(props){
      const {locations, google} = props;

        return (
          <div className="mapBox">
            <Map
              google={google}
              zoom={10}
              style={mapStyles}
              initialCenter={{
               lat: 32.7157,
               lng: -117.1611
            }}>
           {locations.map(function(location, i){
                const newLocation = location.split(",");
                const newLat = newLocation[0];
                const newLang = newLocation[1]; 
                return <Marker key={i} position={{lat: newLat, lng: newLang}}/>;
            })}
          </Map>
        </div>
        )
};


export default GoogleApiWrapper({
  apiKey: 'AIzaSyDL7Ocl912juUGpT-lmjoktDeFMO6cNrRE'
})(MonsterMap);



