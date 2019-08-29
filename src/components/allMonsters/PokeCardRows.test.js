import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PokeCardRows from './PokeCardRows.js';
configure({adapter: new Adapter()})

describe('<PokeCardRows />', () => {
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
        singleMonsterVisible: jest.fn()
    };

    it('renders', () => {
        const wrapper = shallow(<PokeCardRows {...props}/>);
        expect(wrapper).toBeDefined();
    });

});