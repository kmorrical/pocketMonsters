import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class PokeCard extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    };

    render() {

      let randomColor = Math.floor(Math.random()*16777215).toString(16);
      const {monster, singleMonsterVisible, index} = this.props;
      console.log("MONSTER!", monster.additionalInfo.sprites);
      return(
          <div className="PokeCard" 
            onClick={() => singleMonsterVisible(index)}>
            <img src={monster.additionalInfo.sprites.front_default} className="pokeImg"/>
            {(monster.name).toUpperCase()}
          </div>
        );
    }
}

export default PokeCard;



          //might need these
         // onMouseEnter={}
         //  onMouseLeave={}