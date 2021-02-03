import React, {Component} from 'react';

import {Container, Row, Col, Button} from 'reactstrap';

import {CLIENT_TEAM_NAME} from "../../utils/constants";
import TEAM_IMAGE from "../../../../team/images/404 Brain Not Found.jpg"

export default class About extends Component {

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h2>{CLIENT_TEAM_NAME}</h2>
                        <h3>Team Photo</h3>
                        <p>Here will be the Team Photo</p>
                        <img src ={TEAM_IMAGE}/>
                        <h3>Mission Statement</h3>
                        <table width="100%" border="1">
                            <tr>
                                <th>Mission Statement</th>
                            </tr>
                            <tr>
                                <td>Content for Mission Statement</td>
                            </tr>
                        </table>
                        <h3>Members</h3>
                        <p>This is the Members Page</p>
                    </Col>
                    <Col xs="auto">
                        <Button color="primary" onClick={this.props.closePage} xs={1}>
                            Close
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}
