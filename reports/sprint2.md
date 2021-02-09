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
Team 404 Brain Not Found plans on completing the Trip, Protocol Find Feature, Where Am I?, Where Is?, and Find Places epics.

##### Protocol Find Feature
  
Build an API that finds locations for the client. It takes the client POST request in json format, and returns a list of locations to the client in json format. 1)Edit config response so that it takes find feature, type, and where. 2)Read the client request and find the location for the client. 3)return results to clicent. 4)If something is wrong with the client's request, return HTTP status codes. 

##### Where Am I
 
In this epic, we will add a new feature that allows the user to find their location on the map, including locate user's location when the application starts, add a button for user to locate their place, and ensure user will get location details on the table.

Where Is? includes: We will be adding the following functionality - allow users to enter latitutde and longitude coordinates such that the map navigates to those coordinates. The following tasks will need to be completed. 1) Write code to obtain coordinate information from the user in a variety of formats. 2) Write code to validate that the user provided latitude/longitude combination. 3) Write code to move the marker to the user-provided coordinates after validation. 4) Update "this" history and lastly 5)Ensure both the map and the marker show the additional place details. This is a preliminary list of tasks, and we will be adding more tasks as they become evident throughout the development process. This epic will be started after completing the Trip, Protocol find feature, and Where am I epics. Following the completition of this epic we will move on to the Find Places Epic. 

##### Find Places
In this epic, we will add a new feature that will allow us to search for places we would like to visit. Tasks include: 1) displaying locations based on a string entered in. 2) display locations based on a entered in type. 3) display locations based on an entered in area. 4) Allow the user to select an option and display it to the map. 5) add the selected option to history.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *count* | *count* |
| Tasks |  *count*   | *count* | 
| Story Points |  *sum*  | *sum* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *date* | *#task, ...* | *#task, ...* |  | 
| *2/08/2021* | *#Distribute epics to different teams members to create tasks <br /> #Set due date for this evening <br /> #Create sprint2.md document <br /> #Decide to meet tomorrow to discuss next steps* <br /> | *Update Sprint2.md with proper planned epic paragraphs* | | *none |


## Review

### Epics completed  

### Epics not completed 

## Retrospective

### Things that went well

### Things we need to improve

### One thing we will change next time
