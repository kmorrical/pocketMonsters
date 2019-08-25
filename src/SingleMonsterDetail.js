import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class SingleMonsterDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    };

    render() {
        return (

          <div clasName="SingleMonsterDetail">
            <div className="leftCol">
              <div className="photoBox">
                <div>PHOTO GOES HERE</div>
                <p className="alignCenter">NAME HERE</p>
              </div>
              <p>Height</p>
              <p>Weight</p>
              <p>In Bag <input type="checkbox"/></p>
              <div>
                <p>Type1</p>
                <p>Type2</p>
                <p>Type3</p>
              </div>
            </div>
            <div className="rightCol">
              <div className="map"></div>
              <p>Abilities</p>
            </div>
          </div>
        )
    }
}

export default SingleMonsterDetail;