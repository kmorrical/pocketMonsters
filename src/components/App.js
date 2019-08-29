import React, {Component} from 'react';
import '../styling/App.css';
import PokedexMain from './allMonsters/PokedexMain.js';
import SingleMonsterDetail from './singleMonster/SingleMonsterDetail.js';
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
            leftStyle: {
                backgroundColor: 'white'
            },
            rightStyle: {
                backgroundColor: 'orange'
            },
            activeMonsters: [],
            searchVal: '',
            singleMonsterLocations: [],
            searchMode: false
        };
    };

    componentDidMount() {
        this.fetchMonsters();
    };

    fetchMonsters = async() => {
        //set loading to true before fetch to activate spinner
        this.setState({loading: true});
        let monstersCopy;

        await fetch(monstersAPI)
            .then(response => response.json())
            .then(json => {
                monstersCopy = json.results
            })
            .then(() => {
                this.fetchMonsterData(monstersCopy)
            })
            .catch(err => {
                console.log(err);
            });
    };

    // since photos, skills, additional info are in the other api, i thought i might
    // as well get this all on load and then store it in a state object here (since
    // not using redux or back end)
    fetchMonsterData = async(monstersCopy) => {
        for (let i = 0; i < monstersCopy.length; i++) {
            const baseAPI = "https://pokeapi.co/api/v2/pokemon/";
            const name = monstersCopy[i].name;
            const newAPI = baseAPI + name;
            const response = await fetch(newAPI)
            const json = await response.json()
            monstersCopy[i].additionalInfo = json;
            monstersCopy[i].InBag = false;
        }
        //when complete loading spinner goes away
        this.setState({monsters: monstersCopy, activeMonsters: monstersCopy, loading: false})
    };

    // selects pokemon to look at individually would have possibl placed these as
    // properties of the pokemon themselves but i am assuming these locations change
    // often
    singleMonsterVisible = (index) => {
        const {monsters, activeMonsters} = this.state;

        const apiIndex = findIndex(monsters, function (o) {
            return o.name === activeMonsters[index].name;
        });

        fetch("https://api.craft-demo.net/pokemon/" + apiIndex, {
            "method": "GET",
            "headers": {
                "x-api-key": "HHko9Fuxf293b3w56zAJ89s3IcO9D5enaEPIg86l"
            },
            "type": "JSON"
        }).then(response => {
            return response.text();
        }).then(res => {
            const json = JSON.parse(res);
            this.setState({singleMonsterLocations: json.locations});
        }).catch(err => {
            console.log(err);
        });

        this.setState({singleMonster: activeMonsters[index]});
        this.setState({singleMonsterVisible: true});
    };

    changeSearchVal = (event) => {
        this.setState({searchVal: event.target.value});
    };

    searchMonsters = (term) => {
        const {activeMonsters} = this.state;
        let found = [];
        const foundMonster = find(activeMonsters, function (o) {
            return o.name === term;
        });
        if (foundMonster !== undefined) { 
            found.push(foundMonster);
            this.setState({activeMonsters: found});
        }
        else {
            this.setState({activeMonsters: []});
        }
        this.setState({searchMode: true});
    };

    //return to page with this
    closeDetail = (event) => {
        this.setState({singleMonsterVisible: false});
        this.accessAll();
    };

    saveRemoveMonster = (saveMonster, save) => {
        const {savedMonsters, monsters} = this.state;
        const savedMonstersCopy = savedMonsters.slice();
        const monstersCopy = monsters.slice();
        const monsterIndex = findIndex(monstersCopy, function (o) {
            return o.name === saveMonster.name;
        });

        if (save) {
            savedMonstersCopy.push(monstersCopy[monsterIndex]);
            monstersCopy[monsterIndex].InBag = true;
        } else {
            const savedMonsterIndex = findIndex(savedMonstersCopy, function (o) {
                return o.name === saveMonster.name;
            });
            savedMonstersCopy.splice(savedMonsterIndex, 1);
            monstersCopy[monsterIndex].InBag = false;
        }

        this.setState({savedMonsters: savedMonstersCopy, monsters: monstersCopy});
    }

    accessSaved = () => {
        const {savedMonsters} = this.state;
        this.setState({
            leftStyle: {
                backgroundColor: 'orange'
            },
            rightStyle: {
                backgroundColor: 'white'
            }
        });
        this.setState({activeMonsters: savedMonsters, searchMode: false});
    };

    accessAll = () => {
        const {monsters} = this.state;
        this.setState({
            leftStyle: {
                backgroundColor: 'white'
            },
            rightStyle: {
                backgroundColor: 'orange'
            },
            activeMonsters: monsters,
            searchMode: false
        });
    };

    clearSelected = () => {
        this.setState({searchVal: '', searchMode: false});
        this.accessAll();
    };

    render() {
        const {
            singleMonsterVisible,
            leftStyle,
            rightStyle,
            singleMonster,
            activeMonsters,
            singleMonsterLocations,
            loading,
            searchMode
        } = this.state;

        let view;

        // conditional rendering was my solution to a to the api being called over and
        // over and over
        if (!singleMonsterVisible) {
            view = <PokedexMain
                accessSaved={this.accessSaved}
                accessAll={this.accessAll}
                changeSearchVal={this.changeSearchVal}
                searchMonsters={this.searchMonsters}
                clearSelected={this.clearSelected}
                activeMonsters={activeMonsters}
                singleMonsterVisible={this.singleMonsterVisible}
                leftStyle={leftStyle}
                rightStyle={rightStyle}
                loading={loading}
                searchMode={searchMode}/>
        } else {
            view = <SingleMonsterDetail
                saveRemoveMonster={this.saveRemoveMonster}
                closeDetail={this.closeDetail}
                locations={singleMonsterLocations}
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
