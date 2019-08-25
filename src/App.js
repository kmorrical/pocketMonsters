import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PokeContainer from './PokeContainer.js'
import SingleMonsterDetail from './SingleMonsterDetail.js'

const monstersAPI = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            monsters: [],
            singleMonsterVisible: false,
            singleMonster: null,
            leftStyle: { 'background-color': 'white' },
            rightStyle: { 'background-color': 'orange' }
        };
        //do binds here ifnecessary
        // this.functionName = this.functionName.bind(this);
    };

    componentDidMount() {
        this.fetchMonsters();
    }

    fetchMonsters = async () => {
        const response = await fetch(monstersAPI);
        const json = await response.json();
        console.log("JSON!!", json);
        this.setState({ monsters: json.results });

    }

    singleMonsterVisible = (index) => {
        console.log("INDEX", index);
        this.setState({ singleMonster: index });
        this.setState({ singleMonsterVisible: true });

    }

    accessSaved = () => {
        this.setState({ leftStyle: { 'background-color': 'orange' }, rightStyle: { 'background-color': 'white' } })
    }

    accessAll = () => {
        this.setState({ leftStyle: { 'background-color': 'white' }, rightStyle: { 'background-color': 'orange' } })
    }

    render() {
        const { monsters, singleMonsterVisible, leftStyle, rightStyle } = this.state;
        return (
            <div className="App">
              {!singleMonsterVisible ? 
                <>
                    <div className="header">
                        <h1>Gotta Catch 'Em All!</h1>
                        <h2>San Diego Pokédex</h2>
                    </div>
                    <div className="buttonRow">
                        <button className="buttonLeft" style={leftStyle} onClick={this.accessSaved}>Saved</button>
                        <button className="buttonRight" style={rightStyle} onClick={this.accessAll}>All</button>
                    </div>
                    <PokeContainer monsters={monsters} singleMonsterVisible={this.singleMonsterVisible}/>
                </> :
              <SingleMonsterDetail />  
            }
          </div>
        );
    }
}

export default App;
