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
      return(
          <div className="PokeCard" style={{backgroundColor: "#" + randomColor}} 
            onClick={() => singleMonsterVisible(index)}>{monster.name}
          </div>
        );
    }
}

export default PokeCard;



          //might need these
         // onMouseEnter={}
         //  onMouseLeave={}