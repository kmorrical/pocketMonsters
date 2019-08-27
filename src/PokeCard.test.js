import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PokeCard from './PokeCard.jsx';
configure({ adapter: new Adapter() })

describe('<PokeCard />', () => {
  const props = {
    monster: {name: 'venomoth', url: 'https://pokeapi.co/api/v2/pokemon/49/', 
              additionalInfo: {
                sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/49.png"}
              },
    },
    index: 48,
    singleMonsterVisible: jest.fn()
  };

  it('renders', () => {
    const wrapper = shallow(<PokeCard {...props}/>);
    expect(wrapper).toBeDefined();
  });

  it('closes the dialog', () => {
    const wrapper = shallow(<PokeCard {...props}/>);
    const instance = wrapper.instance();

    const pokeCard = wrapper.find(".PokeCard");
    expect(pokeCard.length).toEqual(1);

    pokeCard.simulate("click");
    expect(props.singleMonsterVisible).toHaveBeenCalled();
  });

});