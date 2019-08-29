import React, {useState} from 'react';
import PokeCardRows from './PokeCardRows.js';

function PokedexMain(props) {
    const {
        accessSaved,
        accessAll,
        changeSearchVal,
        searchMonsters,
        activeMonsters,
        singleMonsterVisible,
        leftStyle,
        loading,
        rightStyle
    } = props;

    const [searchTerm,
        setSearch] = useState("");

    return (
        <div>
            <div
                className="header"
                style={{
                fontFamily: 'Fredoka One'
            }}>
                <h1>Gotta Catch 'Em All!</h1>
                <h2>San Diego Pokédex</h2>
            </div>
            <div className="buttonRow">
                <button className="buttonLeft" style={leftStyle} onClick={accessSaved}>Saved</button>
                <button className="buttonRight" style={rightStyle} onClick={accessAll}>All</button>
            </div>
            <div>
                <input
                    type="text"
                    className="buttonLeftSearch"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={e => setSearch(e.target.value)}/>
                <button
                    className="buttonRightSearch"
                    onClick={() => searchMonsters(searchTerm)}>Go!</button>
            </div>
            {loading
                ? (
                    <div className="loaderBox">
                        <div className="loader"/>
                    </div>
                )
                : (<PokeCardRows
                    monsters={activeMonsters}
                    singleMonsterVisible={singleMonsterVisible}/>)}
        </div>
    );
}

export default PokedexMain;