# Introduction

This document describes the architecture and design of a single page web application that interacts with microservices via RESTful APIs.
The key elements in this document include the architecture, user interface, client components, and server classes.

This is a living document that is updated as changes are made each sprint.
The initial document describes the Base code students are given as a starting point for the semester.
Students are expected to update this document as changes are made each sprint to reflect the evolution of their application and key decisions they make.
The Base section serves as an example.


# Base

The Base is a simple application to provide the architecture to the students at the beginning of the semester.
The JavaScript code will be useful examples for students to learn from and leverage in the code they write for sprint 1.
The progressive display of information using collapsible sections and popups will serve as examples of good user interface design.
The overall design is somewhat minimalist/simple for the intended mobile device audience.

### Architecture

The Base architecture is a JavaScript single page web application in an HTML5 browser that uses RESTful APIs to access Micro-services provided by a Java server running on Linux.
The client consists of a minimal index.html file that loads and executes the bundled JavaScript application.
The client and server files are bundled into a single JAR file for execution on the Linux server at a specified port.
The browser fetches the client files from the server on the specified port.

![overview](images/BaseArchitecture.png)

The browser loads the index.html file (by default) which in turn loads the bundled JavaScript single page application bundle.js.
* The single page application makes RESTful API requests to the server on the same port using  JavaScript's asynchronous fetch.  
* A protocol document describes the JSON format for the RESTful API requests and responses.
* JSON Schemas are used to verify requests on the server side and responses on the client side.
* On the client, ReactJS renders the application using ReactStrap, Leaflet, and application defined components.
* GSON is used on the server to convert JSON requests to Java objects and Java objects to JSON responses.
* The client (ulog) and server (SLF4J) logging mechanisms control debugging output during development and production - print statements and console logging should never be used. 

The following architecture elements are not included in the Base system.
They will be added later in the semester.
* Client filesystem .
* Server SQL .
* Server concurrency.


### User Interface
![base](images/BaseUserInterface.png)

The basic screen in black shows the view on a mobile device, with a header, footer, and map.
The header contains a earth logo and the team name obtained from the server when the client was loaded.
The footer contains a connection icon along with the current server name and server URL the client is connected to.
The blue areas highlight the actions that may be performed.

Rather than buttons or icons to signify actions, we are associating actions with elements that are already on the screen to reduce the clutter.
We are using both popups and collapsible sections in this design rather than choosing to use one exclusively.
* Collapsible/Hidden sections are used for the map and about sections since they have a significant amount of content and we don't need to see them at the same time.
* A popup is used for the URL change since we want to control the interaction until the operation is completed. It seemed more natural than another collapsible section.

#### Clicking on the map places a marker.
Whenever a user clicks on the map, the client should display a marker with latitude and longitude at that location.
We only maintain a single marker at this point displaying the most recently clicked location.

#### Clicking on the team name should tell me more about the team.
Whenever a user clicks the team name in the header, a collapsible section should appear under the header with information about the team.
The collapsible map should disappear so only the about or map are displayed.
A close button / icon in the top right corner of the about will close the about and return the map to display.
A simple toggle in state should be able to control this rendering.
The about page should contain the team name as a heading, but be otherwise blank in base. 

#### Clicking on the URL in the footer should let me change the server.
Whenever a user clicks on the URL a popup should open showing the team name, the URL in an input text box, and a Cancel button.
When the user modifies the URL, a Test button should appear and the server name should disappear.
When the Test button is clicked, it will attempt to connect to the server.
If not successful, nothing changes and the user may continue to make URL changes or click the Cancel button to return to the original sever (it shouldn't change).
If successful, the new server name should appear and a Save button should replace the Test button.
When the user clicks the Save button, the server connection should change and the popup closes, revealing the new servername and URL in the footer.


### Component Hierarchy
The component hierarchy for the base application depicted below shows the our top level App component with four children components.
* App renders the major components on the screen.
* Header renders an icon and a team name in the top banner.
* Footer renders the current server connection in the bottom footer.
* Atlas renders a map.
* About renders information about the team.

![base component hierarchy](images/BaseComponentHierarchy.png)

We do not show the many ReactStrap components in this hierarchy, even though they will appear when you are debugging on the client.

### Class Diagram
The class diagram for the base application depicted below shows the basic structure of the web server application.

![class diagram](images/BaseClassDiagram.png )

The classes in blue represent the classes specific to this application.  
* WebApplication processes command line parameters and creates MicroServer.
* MicroServer start a web server on the given port, configures the server for security, static files, and APIs for different types of requests, and processes the requests as they arrive.
* JSONValidator verifies a request is properly formatted before attempting to process it using JSON Schemas.
* ConfigRequest is a specific request that allows the server to respond with its configuration to allow interoperability between clients and servers. 
* RequestHeader defines the basic components of all requests.

The classes in orange represent the external libraries used by the application.
Often there are several related classes but we've listed only one to simplify the diagram.
* GSON converts a JSON string into a Java object instance.
* Spark provides the necessary web support for our MicroServer.
* JSON provides libraries to manipulate JSON objects using the JSON Schema libraries.
* Logger provides a centralized logging facility used in all of the application classes.


# Sprint 1
## User Interface
![image](https://user-images.githubusercontent.com/56741965/106678223-7e55d500-6577-11eb-8b7a-ac1db2d8fe34.png)
![image](https://user-images.githubusercontent.com/56741965/106678240-8a419700-6577-11eb-997b-43936407a842.png)
![image](https://user-images.githubusercontent.com/56741965/106678258-9168a500-6577-11eb-8370-08d72caf07f1.png)
![image](https://user-images.githubusercontent.com/56741965/106678271-97f71c80-6577-11eb-8858-90275df0ac0a.png)
![image](https://user-images.githubusercontent.com/56741965/106678290-a1808480-6577-11eb-8761-080ce861919a.png)

## Components
![image](https://user-images.githubusercontent.com/56741965/106678323-b2c99100-6577-11eb-9e16-d91e9ea04d0f.png)
![image](https://user-images.githubusercontent.com/56741965/106678358-c83ebb00-6577-11eb-80e4-4bdc0544d2c4.png)
![image](https://user-images.githubusercontent.com/56741965/106678369-cf65c900-6577-11eb-81de-c991507b0d71.png)
![image](https://user-images.githubusercontent.com/56741965/106678376-d4c31380-6577-11eb-8ccb-93f04aa1c841.png)

## Classes
![image](https://user-images.githubusercontent.com/56741965/106678423-ee645b00-6577-11eb-8080-3108ae90c051.png)

# Sprint 2
## User Interface
### Where am I?

![image](https://github.com/csucs314s21/t16/blob/vasquezt15-update-design.md-Add-User-Interface-diagrams/reports/images/Sprint2-Epic1-Where%20am%20I%3F%20Interface%20image.png)

We will be adding a buttom on the top left so that the user may click on it and obtain their current location. The marker will then move to the users location, and the location will be added to the trip log at the bottom.

### Where is?
![image](https://github.com/csucs314s21/t16/blob/vasquezt15-update-design.md-Add-User-Interface-diagrams/reports/images/Sprint2-Epic1-Where%20is%3F%20Interface%20image.png)

We will be adding a buttom to allow the user to enter latitude and longitude coordinates. After validating the coordidates the marker will move to the desired location and it will be added to the trip.

### Find Feature

![image](https://github.com/csucs314s21/t16/blob/vasquezt15-update-design.md-Add-User-Interface-diagrams/reports/images/Sprint2-Epic1-Find%20Feature%3F%20Interface%20image.png)

The user will be allowed to search with key words and a list will be returned with a collection of searches matching the user input. Then the user will be able to navigate to the location by clicking it and the location will be added to the trip.
## Components
![C2](https://user-images.githubusercontent.com/56741965/107450530-b1154580-6b02-11eb-9ebf-ca3f1c119e9e.png)

## Classes
![IMG_0200(20210209-212256)](https://user-images.githubusercontent.com/54829242/107464370-635a0680-6b1d-11eb-9a51-46af7a4007bd.PNG)

# Sprint 3
## User Interface
![image](https://user-images.githubusercontent.com/56741965/111723197-c9c2fa80-8828-11eb-918e-a299b80210a8.png)

## Components
![image](https://user-images.githubusercontent.com/56741965/111723237-d6475300-8828-11eb-80b8-3b18685f4b25.png)

## Classes
![image](https://user-images.githubusercontent.com/56741965/111723304-eeb76d80-8828-11eb-9569-4c17fad788a8.png)



# Sprint 4 
## User Interface
![image](./images/Sp4-UI2.png)

# Sprint 5
