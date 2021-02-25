# Sprint 2 - *T16* - *404 Brain Not Found*

## Goal
### *More ways to add places to the trip.*

## Sprint Leader: 
### *Sam Bonafe*

## Definition of Done

* The Increment release for `v2.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.

## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A or B.
* Minimize code smells and duplication.

### Test Driven Development
* Write the tests before the code.
* Unit tests are fully automated.

### Processes
* Main is never broken. 
* All pull request builds and tests for Main are successful.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics
Team 404 Brain Not Found plans on completing the Trip, Protocol Find Feature, Where Am I?, Where Is?, and Find Places epics. We plan to have everything completed before the due date so that we can properly test our server and make sure the deployment works properly. As a team we will work on dividing tasks evenly and working together to overcome the hard challenges we may face.

##### Trip

Trip includes: Create a list of places that have been clicked, Display the list of places that have been clicked with the most recent first, Clear the entire list to start over, Remove individual entries from the list. We will decide who will be assigned to these subtasks once the previous epics have been completed. We plan to complete this epic within the first week of the sprint. Thus laying the groundwork for the rest of our epics.

##### Protocol Find Feature
  
Build an API that finds locations for the client. It takes the client POST request in json format, and returns a list of locations to the client in json format. We will edit config response so that it takes find feature, type, and where. Read the client request and find the location for the client. Return results to clicent. If something is wrong with the client's request, the application will return HTTP status codes. 

##### Where Am I
 
In this epic, we will add a new feature that allows the user to find their location on the map, including locate user's location when the application starts, add a button for user to locate their place, and ensure user will get location details on the table.

##### Where Is?

We will be adding the following functionality - allow users to enter latitutde and longitude coordinates such that the map navigates to those coordinates. The following tasks will need to be completed. Write code to obtain coordinate information from the user in a variety of formats. Write code to validate that the user provided latitude/longitude combination. Write code to move the marker to the user-provided coordinates after validation. Update "this" history and lastly ensure both the map and the marker show the additional place details. This is a preliminary list of tasks, and we will be adding more tasks as they become evident throughout the development process. This epic will be started after completing the Trip, Protocol find feature, and Where am I epics. Following the completition of this epic we will move on to the Find Places Epic. 

##### Find Places

In this epic, we will add a new feature that will allow us to search for places we would like to visit. Tasks include: Search for locations based on user provided key words . Display a list of locations matching the user search . The map will then navigate to a choosen location, if any. The entry selected will be added to the history.

## Metrics

During the sprint 1 we were able to complete 2 of the epics. We spent much of the week sprint learning new technologies and getting our environments up to date. This sprint we believe that we will be able to complete 5 epics in the product backlog. Our goal is to try to complete two of the epics a week in order to stay ahead and use the last few days of the sprint to deploy our server properly on the sprint blackbottle server. If we break up the 26 story points appropriately we will be able to accomplish this ambitious goal set forth by our team.
| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *5* | *count* |
| Tasks |  *21*   | *count* | 
| Story Points |  *27*  | *sum* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *date* | *#task, ...* | *#task, ...* |  | 
| *2/08/2021* | *#Distribute epics to different teams members to create tasks <br /> #Set due date for this evening <br /> #Create sprint2.md document <br /> #Decide to meet tomorrow to discuss next steps <br />* | *Update Sprint2.md with proper planned epic paragraphs* | | *none* |
| *2/10/2021* | *#Make sure table was coded in React <br /> #Discuss Breakdown of Trip epic <br />*  | *Finish Trip Epic by Saturday Morning* | | *none* |
| *2/12/2021* | *#Create a list of map locations clicked <br /> #Display places that have beem clicked <br />* | *Finish Remove Individual Entry <br /> Clear list of places clicked <br />* || *none* |
| *2/17/2021* | *#Create FindRequest class. Add find API entry <br /> #Add schemas for client and server <br />* | *Read client request and find location for client <br /> Return results to client <br /> Make an auto test for find protocol <br />* || *none*| 
| *2/19/2021* | *#Find Protocol <br />* | *Where am I?* || *none* |
| *2/24/2021* | *#Where am I? <br /> #Where is? <br />* | *Run tests<br />* || *none|


## Review

### Epics completed  

### Epics not completed 

## Retrospective

### Things that went well

### Things we need to improve

### One thing we will change next time
