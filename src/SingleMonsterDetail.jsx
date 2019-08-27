import React from 'react';
import MonsterMap from './MonsterMap.jsx'

const mockText = "Lorem ipsum dolor sit amet, purus sodales sit autem leo, amet consectetuer nam sociosqu cum, voluptates urna aenean dolor id elementum placerat, dis in vivamus, consectetuer consectetuer. Sit mauris lectus scelerisque vitae, labore tellus mauris, porttitor ultrices vel pharetra, eleifend tellus nulla donec, libero consectetuer nobis enim at. "

function SingleMonsterDetail(props) {

    const {saveRemoveMonster, activeMonster, locations, closeDetail} = props;

    function changeCheckbox(event) {
      const checked = event.target.checked;

      if (checked) {
        saveRemoveMonster(activeMonster, true);
      }
      else {
        saveRemoveMonster(activeMonster, false);
      }
    }

    return (
      <div className="SingleMonsterDetail">
        <div>
          <button className="closeDetailButton" onClick={closeDetail}>x</button>
        </div>
        <div className="leftCol">
          <div className="photoBox">
            <img alt={activeMonster.name} src={activeMonster.additionalInfo.sprites.front_default} className="pokeImg"/>
            <p className="alignCenter">{activeMonster.name.toUpperCase()}</p>
          </div>
          <div className="monsterDetails">
            <p>
              <b>Height: </b>
              {activeMonster.additionalInfo.height}
            </p>
            <p>
              <b>Weight: </b> 
              {activeMonster.additionalInfo.weight}
            </p>
            <p>
              <b>In Bag </b>
              <input type="checkbox" checked={activeMonster.InBag} onChange={changeCheckbox}/>
            </p>
            <div>
                {activeMonster.additionalInfo.types.map(function(type, i){
                    return <p key={i}><b>Type {i+1}: </b>{type.type.name}</p>;
                  })}
            </div>
            <p>
              <b>Description: </b>
              <br/>{
                mockText}
            </p>
          </div>
        </div>
        <div className="rightCol">
          <div className="map">
              <MonsterMap locations={locations}/>
          </div>
          <div className="abilities">
            <b>Abilities: </b>
                {activeMonster.additionalInfo.abilities.map(function(ability, i){
                  return <p key={i}>{ability.ability.name}</p>;
                })}
          </div>
        </div>
      </div>
    )
}

export default SingleMonsterDetail;