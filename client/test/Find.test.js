import './jestConfig/enzyme.config.js';
import { shallow } from 'enzyme';
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


import React from 'react';
import { Marker } from 'react-leaflet';
import Find from '../src/components/Atlas/Find';

import { sendServerRequest } from "../src/utils/restfulAPI";

async function resolveAllPromises() {
    return new Promise(resolve => {
        setTimeout(resolve, 0);
 })
}

describe('Find', () => {
    const createSnackBar = jest.fn();
    let findWrapper;

    beforeEach(() => {
        findWrapper = shallow(<Find mb-1={createSnackBar} />);
    });

    it('check value of modalFindResponse', () => {
        const initialToggleValue = findWrapper.state().modalFindResponse;
        expect(initialToggleValue).toEqual(false);
    });

    it('check value of modalNew', () => {
        const initialModalNew = findWrapper.state().modalNew;
        expect(initialModalNew).toEqual(false);
    });

    it('check value of validServer', () => {
        const initiaValidServer = findWrapper.state().validServer;
        const expectedValidServer = null;
        expect(initiaValidServer).toEqual(expectedValidServer);
    });

    it('checks that foundLocations: [] is empty', () => {
        const actualFoundLocationsArray = findWrapper.state().foundLocations;
        const expectedFoundLocationsArray = [];
        expect(actualFoundLocationsArray).toEqual(expectedFoundLocationsArray);
    });

    it('checks that find: [] is empty', () => {
        const actualFindArray = findWrapper.state().find;
        const expectedFindArray = [];
        expect(actualFindArray).toEqual(expectedFindArray);
    });

    it('checks that matchName empty', () => {
        const actualMatchName = findWrapper.state().matchName;
        const expectedMatchName = "";
        expect(actualMatchName).toEqual(expectedMatchName);
    });
});

