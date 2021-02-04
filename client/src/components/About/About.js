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
                        <img src ={TEAM_IMAGE} alt="Picture" width="250" height="250"></img>
                        <h3>Mission Statement</h3>
                        <table width="100%" border="1">
                            <tr>
                                <th>Mission Statement</th>
                            </tr>
                            <tr>
                                <td>404 Brain Not Found is a team committed to making a quality travel map application. 
                                        Our purpose is to provide the end user with an easy to use experience. 
                                        We aim to create a clean and intuitive application that anyone can use in order to create the ultimate trip. 
                                        Our goal is to collectively work together in order to make sure that the location is always found.</td>
                            </tr>
                        </table>
                        <h3>Members</h3>
                        <div class="teamBio">
                            <div class="inline-block">
                                <img src="images/mark.jpg" class = "Imagecover" alt="Profile Picture of Mark Garner" width="180" height="250"/>
                                <div class="bioTxtContainer">
                                    <p><b>Mark Garner</b></p>
                                    <p>Major in Computer Science</p>
                                    <p>Proficient in HTML, CSS, C++, Javascript, and Java.</p>
                                </div>
                            </div>

                            <div class="inline-block">
                                <img src="images/IMG_20180919_071702_480.jpg" class = "Imagecover" alt="Profile Picture of Sam Bonafe" width="180" height="250"/>
                                <div class="bioTxtContainer">
                                    <p><b>Sam Bonafe</b></p>
                                    <p>Major in Computer Science</p>
                                    <p>Learning to code in C++, Javascript, Java, C</p>
                                </div>
                            </div>

                            <div class="inline-block">
                                <img src="images/yx.jpg" class = "Imagecover" alt="Picture" width="180" height="250"/>
                                <div class="bioTxtContainer">
                                    <p><b>Yuxin Huang</b></p>
                                    <p class="p">Major in CS & Math</p>
                                    <p class="p">Speaks English & Chinese</p>
                                    <p class="p">Learning to code in java, C#, C++, Python</p>
                                    <p><a href="https://twitter.com/GeorgeChaoXiao">Twitter: ChaoXiao</a></p>
                                </div>
                            </div>

                            <div class="inline-block">
                                <img src="images/FanSi-Biopic.jpg" class="Imagecover" alt="FanSi_bioPic" width="180" height="250"/>
                                <div class="bioTxtContainer">
                                    <p><b>Fan Si</b></p>
                                    <p>Computer Science student at CSU. Learning & Using C, C++, Java, Python, Lua, JS, HTML. Speaks English, Chinese & learing Japanese</p>
                                </div>

                            </div>

                            <div class="inline-block">
                                <img src="images/Copper.jpg" class = "Imagecover" alt="Picture" width="180" height="250"/>
                                <div class="bioTxtContainer">
                                    <p><b>Tomas Vasquez</b></p>
                                    <p class="p">Major in Computer Science and Math.</p>
                                    <p class="p">Speaks English, Spanish, and German.</p>
                                    <p class="p">Proficient in C, C++, Java, Python, and R.</p>
                                </div>
                            </div>
                    
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
