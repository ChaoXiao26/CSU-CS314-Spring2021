import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';
import {Marker} from 'react-leaflet';
import Find from '../src/components/Atlas/Find';

describe('Find', () => {
    const createSnackBar = jest.fn();
    let findWrapper;

    beforeEach(() => {
        findWrapper = shallow(<Find createSnackBar={createSnackBar}/>);
    });
