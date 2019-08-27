import React, { Component } from 'react';
import './App.css';
import PokeCard from './PokeCard.js'

function PokeContainer(props) {
    const { monsters, singleMonsterVisible } = props;
        return (
           <div className="PokeContainer">
			   {props.monsters.map(function(monster, i){
			        return <PokeCard key={i} monster={monster} index={i} singleMonsterVisible={singleMonsterVisible}/>;
				})}
          </div>
        );
}

export default PokeContainer;