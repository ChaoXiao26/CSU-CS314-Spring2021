import './jestConfig/enzyme.config.js';
import { shallow } from 'enzyme';


import React from 'react';
import { Marker } from 'react-leaflet';
import Find from '../src/components/Atlas/Find';
import Match from '../src/components/Atlas/Atlas';


describe('Find', () => {
    const createSnackBar = jest.fn();
    let findWrapper;

    beforeEach(() => {
        findWrapper = shallow(<Find createSnackBar={createSnackBar} />);
    });

    it('renders a ChildComponent', () => {
        expect(findWrapper.contains(<Match />)).toEqual(false);
    });
});
