import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PokeCard from './PokeCard.js'

class PokeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    render() {
        console.log(this.props.monsters);
        const { monsters, singleMonsterVisible } = this.props;
        return (
           <div className="PokeContainer">
			   {this.props.monsters.map(function(monster, i){
			        return <PokeCard key={i} monster={monster} index={i} singleMonsterVisible={singleMonsterVisible}/>;
				})}
          </div>
        );
    }
}

export default PokeContainer;