import React from 'react';

function PokeCard(props) {

    const {monster, singleMonsterVisible, index} = props;
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    return (
        <div
            className="PokeCard"
            onClick={singleMonsterVisible
            ? (() => singleMonsterVisible(index))
            : null}>
            <img
                alt={monster.name}
                src={monster.additionalInfo.sprites.front_default}
                className="pokeImg"/>
            <b style={{
                color: randomColor
            }}>{(monster.name).toUpperCase()}</b>
        </div>
    );
}

export default PokeCard;
