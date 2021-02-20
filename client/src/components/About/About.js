import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
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
                    </Col>
                    <Col xs="auto">
                    <Button color="primary" onClick={this.props.closePage} xs={1}>
                        Close
                    </Button>
                </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Team Photo</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <img src ={TEAM_IMAGE} alt="Picture" width="250" height="250"></img>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Mission Statement</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <table width="100%" border="1">
                            <tbody>
                                <tr>
                                    <th>Mission Statement</th>
                                </tr>
                                <tr>
                                    <td>
                                        404 Brain Not Found is a team committed to making a quality travel map application. 
                                        Our purpose is to provide the end user with an easy to use experience. 
                                        We aim to create a clean and intuitive application that anyone can use in order to create the ultimate trip. 
                                        Our goal is to collectively work together in order to make sure that the location is always found.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Members</h3>
                    </Col>
                </Row>
                <Row>
                    {this.printCard(
                        //img_src 
                        "https://i.postimg.cc/2SNNQQ9Y/mark.jpg",
                        //img_alt 
                        "Profile Picture of Mark Garner",
                        //pers_name
                        "Mark Garner",
                        //info
                        (<CardText>
                            Major in Computer Science.<br/>
                            Proficient in HTML, CSS, C++, Javascript, and Java.
                        </CardText>)
                    )}
                    {this.printCard(
                        //img_src 
                        "https://i.postimg.cc/dtyKZHBn/IMG-20180919-071702-480.jpg",
                        //img_alt 
                        "Profile Picture of Sam Bonafe",
                        //pers_name
                        "Sam Bonafe",
                        //info
                        (<CardText>
                            Major in Computer Science.<br/>
                            Learning to code in C++, Javascript, Java, C.
                        </CardText>)
                    )}
                    {this.printCard(
                        //img_src 
                        "https://i.postimg.cc/pLQbqm3F/yx.jpg",
                        //img_alt 
                        "Profile Picture of Yuxin Huang",
                        //pers_name
                        "Yuxin Huang",
                        //info
                        (<CardText>
                            Major in CS & Math<br/>
                            Speaks English & Chinese<br/>
                            Learning to code in java, C#, C++, Python<br/>
                            <a href="https://twitter.com/GeorgeChaoXiao">Twitter: ChaoXiao</a>
                        </CardText>)
                    )}
                    {this.printCard(
                        //img_src
                        "https://i.postimg.cc/kMZm43xB/Fan-Si-Biopic.jpg",
                        //img_alt
                        "FanSi_bioPic",
                        //pers_name
                        "Fan Si",
                        //info
                        (<CardText>
                            Computer Science student at CSU. Learning & Using C, C++, Java, Python, Lua, JS, HTML. Speaks English, Chinese & Learning Japanese
                        </CardText>)
                    )}
                    {this.printCard(
                        //img_src 
                        "https://i.postimg.cc/Y0JKyYp1/Copper.jpg",
                        //img_alt 
                        "Profile Picture of Tomas Vasquez",
                        //pers_name
                        "Tomas Vasquez",
                        //info
                        (<CardText>
                            Major in Computer Science and Math.<br/>
                            Speaks English, Spanish, and German.<br/>
                            Proficient in C, C++, Java, Python, and R.
                        </CardText>)
                    )}
                </Row>
            </Container>
        );
    }
    printCard(img_src, img_alt, pers_name, info)
    {
        return(
            <Col>
                <Card style={{ borderWidth: '2px', borderColor: 'black'}}>
                    <CardImg style = {{ height: '300px', objectFit: 'cover' }}src={img_src} alt={img_alt}/>
                    <CardBody style ={{ height: '250px' }}>
                    <CardTitle tag = "h5">{pers_name}</CardTitle>
                        {info}
                    </CardBody>
                </Card>
            </Col>
        );
    }
}
