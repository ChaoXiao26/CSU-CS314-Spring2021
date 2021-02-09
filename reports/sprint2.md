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

<b>Protocol Find Feature<b>
  
Build a API that find locations for client. It takes client POST request in json format, and return a list of location to client in json format. 1)Edit config response, so that it takes find feature, type, and where. 2)Read client request and find location for client. 3)return results to clicent. 4)If something is wrong with client's request, return HTTP status codes. 

<b>Where Am I<b>
 
In this epic, we will add a new feture that allow user to finding their location on the map, including locate user's location when the application starts, add a button for user to locate their place, add ensure user will get location details on the table.

Where Is? includes: We will be adding the following functionality - allow users to enter latitutde and longitude coordinates such that the map navigates to those coordinates. The following tasks will need to be completed. 1) Write code to obtain coordinate information from the user in a variety of formats. 2) Write code to validate the user provided latitude/longitude combination. 3) Write code to move marker to user provided coordinates after validation. 4) Update "this" history and lastly 5)Ensure both the map and the marker show the additional place details. This is a preliminary list of tasks, and we will be adding more tasks as they become evident throughout the development process. This epic will be started after completing the Trip, Protocol find feature, and Where am I epics. Following the completition of this epic we will move on to the Find Places Epic. 

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
