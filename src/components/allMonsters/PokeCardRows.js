import React from 'react';
import PokeCard from '../common/PokeCard.js';

function PokeCardRows(props) {
    const {monsters, singleMonsterVisible} = props;
    return (
        <div className="PokeRowContainer">
            {monsters
                .map(function (monster, i) {
                    return <PokeCard
                        key={i}
                        monster={monster}
                        index={i}
                        singleMonsterVisible={singleMonsterVisible}/>;
                })}
        </div>
    );
}

export default PokeCardRows;