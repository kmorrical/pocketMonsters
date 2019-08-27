import React, {useState} from 'react';
import PokeContainer from './PokeContainer.jsx'

function PokedexMain(props) {
    const { accessSaved, 
    		accessAll, 
    		changeSearchVal, 
    		searchMonsters, 
    		clearSelected, 
    		activeMonsters, 
    		singleMonsterVisible,
    		leftStyle,
    		loading,
    		rightStyle 
    		} = props;

        return (<div>
                    <div className="header">                                                
                        <h1>Gotta Catch 'Em All!</h1>
                        <h2>San Diego Pokédex</h2>
                    </div>
                    <div className="buttonRow">
                        <button className="buttonLeft" style={leftStyle} onClick={accessSaved}>Saved</button>
                        <button className="buttonRight" style={rightStyle} onClick={accessAll}>All</button>
                    </div>
                    <div>
                        <input type="text" className="buttonLeftSearch" placeholder="Search..." onChange={changeSearchVal}></input>
                        <button className="buttonRightSearch" onClick={searchMonsters}>Go!</button>
                            {clearSelected}
                    </div>
                    {loading ? 
                    	(<div className="loaderBox">
                    		<div className="loader"/>
                    	</div>) :
                    	(<PokeContainer monsters={activeMonsters} singleMonsterVisible={singleMonsterVisible}/>)}
                </div> 
        );
}

export default PokedexMain;