import React from 'react';
import MonsterMap from './MonsterMap.js';
import PokeCard from '../common/PokeCard.js';

const mockText = "Lorem ipsum dolor sit amet, purus sodales sit autem leo, amet consectetuer nam s" +
        "ociosqu cum, voluptates urna aenean dolor id elementum placerat, dis in vivamus," +
        " consectetuer consectetuer. Sit mauris lectus scelerisque vitae, labore tellus m" +
        "auris, porttitor ultrices vel pharetra, eleifend tellus nulla donec, libero cons" +
        "ectetuer nobis enim at. "

function SingleMonsterDetail(props) {

    const {saveRemoveMonster, activeMonster, locations, closeDetail, activeMonsterIndex} = props;

    function changeCheckbox(event) {
        const checked = event.target.checked;

        if (checked) {
            saveRemoveMonster(activeMonster, true);
        } else {
            saveRemoveMonster(activeMonster, false);
        }
    }

    return (
        <div className="SingleMonsterDetail">
            <div>
                <button className="closeDetailButton" onClick={closeDetail}>x</button>
            </div>
            <div className="leftCol">
                <div className="alignCenter">
                    <PokeCard
                        monster={activeMonster}
                        singleMonsterVisible={false}
                        index={activeMonsterIndex}/>
                </div>
                <div className="monsterDetails">
                    <p>
                        <b className="titleText">Height:
                        </b>
                        {activeMonster.additionalInfo.height}
                    </p>
                    <p>
                        <b className="titleText">Weight:
                        </b>
                        {activeMonster.additionalInfo.weight}
                    </p>
                    <p>
                        <b className="titleText">In Bag
                        </b>
                        <input type="checkbox" checked={activeMonster.InBag} onChange={changeCheckbox}/>
                    </p>
                    <div>
                        {activeMonster
                            .additionalInfo
                            .types
                            .map(function (type, i) {
                                return <p key={i}>
                                    <b className="titleText">Type {i + 1}:
                                    </b>{type.type.name}</p>;
                            })}
                    </div>
                    <p>
                        <b className="titleText">Description:
                        </b>
                        <br/>{mockText}
                    </p>
                </div>
            </div>
            <div className="rightCol">
                <div className="map">
                    <MonsterMap locations={locations}/>
                </div>
                <div className="abilities">
                    <b>Abilities:
                    </b>
                    {activeMonster
                        .additionalInfo
                        .abilities
                        .map(function (ability, i) {
                            return <p key={i}>{ability.ability.name}</p>;
                        })}
                </div>
            </div>
        </div>
    )
}

export default SingleMonsterDetail;