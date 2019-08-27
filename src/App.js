import React, { Component } from 'react';
import './App.css';
import PokeContainer from './PokeContainer.js'
import SingleMonsterDetail from './SingleMonsterDetail.js'
import findIndex from 'lodash/findIndex'

const monstersAPI = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            monsters: [],
            savedMonsters: [],
            singleMonsterVisible: false,
            singleMonster: null,
            leftStyle: { backgroundColor: 'white' },
            rightStyle: { backgroundColor: 'orange' },
            activeMonsters: [],
            searchVal: '',
            singleMonsterLocations: []
        };
    };

    componentDidMount() {
         this.fetchMonsters();
    }


    fetchMonsters = async () => {
        let individualData = [];
        const response = await fetch(monstersAPI);
        const json = await response.json();
        let monstersCopy = json.results.slice();
        await this.fetchMonsterData(monstersCopy);
    };


    fetchMonsterData = async (monstersCopy) => {
        for(let i=0; i< monstersCopy.length;i++){
            const baseAPI = "https://pokeapi.co/api/v2/pokemon/";
            const name = monstersCopy[i].name;
            const newAPI = baseAPI + name;
            const response = await fetch(newAPI)
            const json = await response.json()

            monstersCopy[i].additionalInfo = json;
        }
         this.setState({monsters: monstersCopy, activeMonsters: monstersCopy})
    }
    //selects pokemon to look at individually
    singleMonsterVisible = (index) => {
        this.setState({ singleMonster: this.state.activeMonsters[index] });
        this.setState({ singleMonsterVisible: true });

                fetch("https://api.craft-demo.net/pokemon/1", {
                "method": "GET",
                "headers": {
                    "x-api-key": "HHko9Fuxf293b3w56zAJ89s3IcO9D5enaEPIg86l"
                },
                "type": "JSON"
            })
            .then(response => {
                return response.text();
            })
            .then(res => {
                const json = JSON.parse(res);
                this.setState({singleMonsterLocations: json.locations});

            })
            .catch(err => {
            });

    }

    changeSearchVal = (event) => {
        event.preventDefault()
        this.setState({searchVal: event.target.value});
    }

    searchMonsters = (event) => {
        event.preventDefault()

    }

    closeDetail = (event) => {
        this.setState({singleMonsterVisible: false});
    }

    saveMonster = (index) => {
        const savedMonstersCopy = this.state.savedMonsters.slice();
        const monstersCopy = this.state.monsters.slice();
        const monsterIndex = findIndex(monstersCopy, function(o) { return o.name == index.name; });

        savedMonstersCopy.push(monstersCopy[monsterIndex]);

        this.setState({savedMonsters: savedMonstersCopy});
    };

    removeMonster = (index) => {
        let savedMonstersCopy = this.state.savedMonsters.splice();
        for( var i = 0; i < savedMonstersCopy.length; i++){ 
            if ( savedMonstersCopy[i] === index) {
            savedMonstersCopy.splice(i, 1); 
            }
        }
        this.setState({savedMonsters: savedMonstersCopy})
    };

    accessSaved = () => {
        this.setState({ leftStyle: { backgroundColor: 'orange' }, rightStyle: { backgroundColor: 'white' } });
        this.setState({activeMonsters: this.state.savedMonsters});
    }

    accessAll = () => {
        this.setState({ leftStyle: { backgroundColor: 'white' }, rightStyle: { backgroundColor: 'orange' } })
        this.setState({activeMonsters: this.state.monsters})
    }

    render() {
        const { monsters, singleMonsterVisible, leftStyle, rightStyle, singleMonster, activeMonsters, singleMonsterLocations } = this.state;
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
                    <div><input type="text" className="buttonLeftSearch" placeholder="Search..." onChange={this.changeSearchVal}></input>
                    <button className="buttonRightSearch" onClick={() => this.searchMonsters}>Go!</button>
                    </div>
                    <PokeContainer monsters={activeMonsters} singleMonsterVisible={this.singleMonsterVisible}/>
                </> :
              <SingleMonsterDetail saveMonster={this.saveMonster} closeDetail={this.closeDetail} locations={singleMonsterLocations} removeMonster={this.removeMonster} activeMonster={singleMonster}/>  
            }
          </div>
        );
    }
}

export default App;
