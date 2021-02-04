import React, {Component} from 'react';

import {Container, Row, Col, Button} from 'reactstrap';

import {CLIENT_TEAM_NAME} from "../../utils/constants";
import TEAM_IMAGE from "../../../../team/images/404 Brain Not Found.jpg"

/* 
    A simple instrucation for member bio container
    You need to change things inside <div id="inline-block">
    there are five of those blocks everyone should take one.
    Put your bio image under ~/client/images/, change "images/yourImageHere.png" to your pics.
    Put your bio text inside bioTxtContainer at "Your Bio here". Use <br><\br> to make a new line.
    You can change the css file here -> ~/client/src/static/styles/student-styles.scss if you want to change how everything looks.
    Make sure you test it after edit.
*/

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
                        <div class="teamBio">
                            <div class="inline-block">
                                <img src="images/yourImageHere.png" alt="Picture" width="180" height="250"></img>
                                <div class="bioTxtContainer">Your name.<br></br>Your Bio here.</div>
                            </div>
                            &nbsp;&nbsp;&nbsp;

                            <div class="inline-block">
                                <img src="images/yourImageHere.png" alt="Picture" width="180" height="250"></img>
                                <div class="bioTxtContainer">Your name.<br></br>Your Bio here.</div>
                            </div>
                            &nbsp;&nbsp;&nbsp;

                            <div class="inline-block">
                                <img src="images/yourImageHere.png" alt="Picture" width="180" height="250"></img>
                                <div class="bioTxtContainer">Your name.<br></br>Your Bio here.</div>
                            </div>
                            &nbsp;&nbsp;&nbsp;

                            <div class="inline-block">
                                <img src="images/FanSi-Biopic.jpg" class="Imagecover" alt="FanSi_bioPic" width="180" height="250"></img>
                                <div class="bioTxtContainer"><b>Fadn Si</b><br></br>Computer Science student at CSU. Learning & Using C, C++, Java, Python, Lua, JS, HTML. Speak English, Chinese & learing Japanese</div>
                            </div>
                            &nbsp;&nbsp;&nbsp;

                            <div class="inline-block">
                                <img src="images/yourImageHere.png" alt="Picture" width="180" height="250"></img>
                                <div class="bioTxtContainer">Your name.<br></br>Your Bio here.</div>
                            </div>
                            &nbsp;&nbsp;&nbsp;
                    
                        </div>
            
            
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
