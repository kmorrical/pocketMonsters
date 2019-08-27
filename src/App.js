import React, { Component } from 'react';
import './App.css';
import PokedexMain from './PokedexMain.jsx'
import SingleMonsterDetail from './SingleMonsterDetail.jsx'
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';

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
            singleMonsterLocations: [],
            searchMode: false
        };
    };

    componentDidMount() {
         this.fetchMonsters();
         //todo set timeout here?
    };

    fetchMonsters = async () => {
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
            monstersCopy[i].InBag = false;
        }
         this.setState({monsters: monstersCopy, activeMonsters: monstersCopy})
    };

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
    };

    changeSearchVal = (event) => {
        this.setState({searchVal: event.target.value});
    };

    searchMonsters = (event) => {
        const {searchVal, activeMonsters} = this.state;
        var found = [];
        const foundMonster = find(activeMonsters, function(o) { return o.name === searchVal; });
        found.push(foundMonster);
        this.setState({activeMonsters: found, searchMode: true});
    };

    closeDetail = (event) => {
        this.setState({singleMonsterVisible: false});
    };

    saveMonster = (index) => {
        const {savedMonsters, monsters} = this.state;
        const savedMonstersCopy = savedMonsters.slice();
        const monstersCopy = monsters.slice();
        const monsterIndex = findIndex(monstersCopy, function(o) { return o.name === index.name; });
        
        savedMonstersCopy.push(monstersCopy[monsterIndex]);
        this.setState({savedMonsters: savedMonstersCopy, monsters: [...monsters, monsters[monsterIndex].InBag = true] });
    };

    removeMonster = (index) => {
        const {savedMonsters, monsters} = this.state;
        let savedMonstersCopy = savedMonsters.splice();

        for( let i = 0; i < savedMonstersCopy.length; i++){ 
            if ( savedMonstersCopy[i] === index) {
            savedMonstersCopy.splice(i, 1); 
            }
        }
        this.setState({savedMonsters: savedMonstersCopy, monsters: [...monsters, monsters[index].InBag = false]})
    };

    accessSaved = () => {
        const {savedMonsters} = this.state;
        this.setState({ leftStyle: { backgroundColor: 'orange' }, rightStyle: { backgroundColor: 'white' } });
        this.setState({activeMonsters: savedMonsters});
    };

    accessAll = () => {

        const {monsters} = this.state;
    


        this.setState({ leftStyle: { backgroundColor: 'white' }, rightStyle: { backgroundColor: 'orange' } , activeMonsters: monsters})


    };

    clearSelected = () => {
        this.setState({searchVal: '', searchMode: false});
        this.accessAll(); 
    };

    render() {
        const { singleMonsterVisible, 
                leftStyle, 
                rightStyle, 
                singleMonster, 
                activeMonsters, 
                singleMonsterLocations, 
                searchMode } 
                = this.state;

        let clearSelected = null;
        let view;        

        if (searchMode) {
            clearSelected = <p className="link" onClick={this.clearSelected}>Clear Search</p>
        } else {
            clearSelected = null
        }
        
        // conditional rendering was my solution to a to the api being called over and over and over
        if (!singleMonsterVisible) {
            view = <PokedexMain accessSaved={this.accessSaved}
                                accessAll={this.accessAll}
                                changeSearchVal={this.changeSearchVal}
                                searchMonsters={this.searchMonsters}
                                clearSelected={this.clearSelected}
                                activeMonsters={activeMonsters}
                                singleMonsterVisible={this.singleMonsterVisible}
                                leftStyle={leftStyle}
                                rightStyle={rightStyle} />
        } else {
           view = <SingleMonsterDetail saveMonster={this.saveMonster} 
                                       closeDetail={this.closeDetail} 
                                       locations={singleMonsterLocations} 
                                       removeMonster={this.removeMonster} 
                                       activeMonster={singleMonster}/> 
        }      

        return (
            <div className="App">
                {view}
            </div>
        );
    }
}

export default App;

