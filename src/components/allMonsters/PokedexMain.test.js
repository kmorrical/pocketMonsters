import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PokedexMain from './PokedexMain.js';
configure({adapter: new Adapter()})

describe('<PokedexMain />', () => {
    const props = {
        monsters: [{
            name: "pokemon1",
            url: "https://pokeapi.co/api/v2/pokemon/1",
            inBag: false,
            additionalInfo: {
                abilities: []
            },
            height: 50,
            weight: 50,
            sprites: {
                front_default: ""
            }
        }],
        singleMonsterVisible: jest.fn(),
        accessSaved: jest.fn(),
        accessAll: jest.fn(),
        searchMode: false,
        searchMonsters: jest.fn(),
        activeMonsters: [{
            name: "pokemon1",
            url: "https://pokeapi.co/api/v2/pokemon/1",
            inBag: false,
            additionalInfo: {
                abilities: []
            },
            height: 50,
            weight: 50,
            sprites: {
                front_default: ""
            }
        }],
        singleMonsterVisible: jest.fn(),
        leftStyle: {'background-color': 'orange'},
        loading: false,
        rightStyle: {'background-color': 'white'},
    };

    it('renders', () => {
        const wrapper = shallow(<PokedexMain {...props}/>);
        expect(wrapper).toBeDefined();
    });

});