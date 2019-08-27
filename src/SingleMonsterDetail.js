import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MonsterMap from './MonsterMap.js'

const mockText = "Lorem ipsum dolor sit amet, purus sodales sit autem leo, amet consectetuer nam sociosqu cum, voluptates urna aenean dolor id elementum placerat, dis in vivamus, consectetuer consectetuer. Sit mauris lectus scelerisque vitae, labore tellus mauris, porttitor ultrices vel pharetra, eleifend tellus nulla donec, libero consectetuer nobis enim at. "

function SingleMonsterDetail(props) {

    const {saveMonster, removeMonster, activeMonster, locations, closeDetail} = props;

    function changeCheckbox(event) {
      const checked = event.target.checked;

      if (checked) {
        props.saveMonster(props.activeMonster);
      }
      else {
        props.removeMonster(props.activeMonster);
      }
    }

    return (
      <div className="SingleMonsterDetail">
        <div>
          <button className="closeDetailButton" onClick={closeDetail}>x</button>
        </div>
        <div className="leftCol">
          <div className="photoBox">
            <img src={activeMonster.additionalInfo.sprites.front_default} className="pokeImg"/>
            <p className="alignCenter">{activeMonster.name.toUpperCase()}</p>
          </div>
          <div className="monsterDetails">
            <p>Height: {activeMonster.additionalInfo.height}</p>
            <p>Weight: {activeMonster.additionalInfo.weight}</p>
            <p>In Bag <input type="checkbox" onChange={changeCheckbox}/></p>
            <div>
                {activeMonster.additionalInfo.types.map(function(type, i){
                    return <p key={i}><b>Type {i+1}: </b>{type.type.name}</p>;
                  })}
            </div>
            <p><b>Description:</b>{mockText}</p>
          </div>
        </div>
        <div className="rightCol">
          <div className="map">
              <MonsterMap locations={locations}/>
          </div>
          <div className="abilities">
            <b>Abilities:</b>
                {activeMonster.additionalInfo.abilities.map(function(ability, i){
                  return <p key={i}>{ability.ability.name}</p>;
                })}
          </div>
        </div>
      </div>
    )
}

export default SingleMonsterDetail;