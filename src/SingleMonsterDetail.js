import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MonsterMap from './MonsterMap.js'

const mockText = "Lorem ipsum dolor sit amet, purus sodales sit autem leo, amet consectetuer nam sociosqu cum, voluptates urna aenean dolor id elementum placerat, dis in vivamus, consectetuer consectetuer. Sit mauris lectus scelerisque vitae, labore tellus mauris, porttitor ultrices vel pharetra, eleifend tellus nulla donec, libero consectetuer nobis enim at. "

class SingleMonsterDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    };

    changeCheckbox = (event) => {
      console.log("EVENT!", event.target.checked);
      const checked = event.target.checked;
      if (checked) {
        this.props.saveMonster(this.props.activeMonster);
      }
      else {
        this.props.removeMonster(this.props.activeMonster);
      }
    }

    render() {
      const {saveMonster, removeMonster, activeMonster, locations, closeDetail} = this.props;
        return (

          <div className="SingleMonsterDetail">
          <div>
          <button className="closeDetailButton" onClick={closeDetail}>x</button>
          </div>
            <div className="leftCol">
              <div className="photoBox">
                <div>PHOTO GOES HERE</div>
                <p className="alignCenter">NAME HERE</p>
              </div>
              <div className="monsterDetails">
              <p>Height</p>
              <p>Weight</p>
              <p>In Bag <input type="checkbox" onChange={this.changeCheckbox}/></p>
              <div>
                <p>Type1</p>
                <p>Type2</p>
                <p>Type3</p>
              
              </div>
              <p>{mockText}</p>
              </div>
            </div>
            <div className="rightCol">
              <div className="map">
                <MonsterMap locations={locations}/>
              </div>
              <div className="abilities">
              <p>Abilities</p>
              </div>
            </div>
          </div>
        )
    }
}

export default SingleMonsterDetail;