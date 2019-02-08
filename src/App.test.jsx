import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import App from './App';

configure({ adapter: new Adapter() });

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should have the <div>Hello from Dixit!</div>', () => {
    expect(wrapper.contains(<div>Hello from Dixit!</div>)).toBe(true);
  });
});
