import React from 'react';

function PokeCard(props) {

      const {monster, singleMonsterVisible, index} = props;

      return(
          <div className="PokeCard" 
            onClick={() => singleMonsterVisible(index)}>
            <img alt={monster.name} src={monster.additionalInfo.sprites.front_default} className="pokeImg"/>
            {(monster.name).toUpperCase()}
          </div>
        );
}

export default PokeCard;

