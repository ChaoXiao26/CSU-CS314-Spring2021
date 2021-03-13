# Sprint 3 - *T16* - *404 Brain Not Found*

## Goal
### *How far is it?*

## Sprint Leader: 
### *Yuxin Huang*

## Definition of Done

* The Increment release for `v3.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.

## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A (technical debt ratio < 5).
* Minimize code smells and duplication.

### Test Driven Development
* Write the tests before the code.
* Unit tests are fully automated.
* Code coverage is 70%

### Processes
* Incremental development.  No big bangs.
* Main is never broken. 
* All pull request builds and tests for Main are successful.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics
For sprint 3, we were planning on completing a total of 6 epics, including "find places", "protocol distance feature", "calculate distances", "place details", "show trip" and "mark selected". In the meantime, we will fix some small problems in the "protocol find feature" epic. As a team, we will complete each of the epics together by splitting the hard work to every team member and working together to solve the hard problem.


### Find Details

In this epic, we will add a new feature that will allow us to search for places we would like to visit. Tasks include: Search for locations based on user provided key words, display a list of locations matching the user search, access the find api, create a UI button on the client, and create tests. The map will then navigate to a choosen location, if any. The entry selected will have the option of being added to the history. This epic is leftover from sprint 2. Therefore, it is on the top of our priority list.

### Place Details

Place details includes the subtasks: Create a reverse geocoding utility function, add geographic details to the popup and the list, create a column for the address, add address details to the table upon clicking, and creating tests for the entire epic. We will decide who will be assigned to these subtasks once the previous epics have been completed. This epic should be completed in a quick fashion because we already have a general idea as a team how to finish this epic.
### Calculate Distances

The user would like to calculate distances between destinations and for their planned trip. To provide this functionality we will Implement a function that calculates the distances with the given radius in miles (3959). We will show the distance between two places by providing a button, prompting the user to click on two adjacent locations, perform the calculation, and return the information to the user in a pop-up. We will add a button that gives the user the total distance for their planned trip in a pop up. We will re-calcualate the distance of the trip and update it on the trip table for the user upon adding each new entry.


### Show Trip
The user would like to see a line on the map for the tour contained in the history, including a return to the starting location. We will add a button to allow the user to call for a line to be drawn. We will implement the function to draw the line. The line will respond to new entries and adjust the trip to them. The user will have the option to return to the starting location when prompted.

### Protcol Distance Feature
Protocol Distance Feature includes the subtasks: Make client send a Post Request to api/distances, and Create an API that returns places, latlng, and earth radius. We will decide who will be assigned to work on these subtasks once we finish previous epics and the sprint document.

### Mark Selected
The Mark Selected Epic includes the following subtasks: Create a button to allow the user to click on an entry on the trip table and then the marker goes to it. Send the information from the trip table to the marker. Display the details in a pop-up after the marker goes to the entry. We will decide who will be assigned to which of these sub-tasks once the previous Epic has been completed.


## Metrics
During the Sprint 2 we have completed four epics and have left "find places" epic to this sprint. In Sprint 3, we will continue working on "find places" and adding more featurte like "calculate distances" to our servers, and making users have better experience in our website. Our goal is to try to let every team member work together in every epic so everyone is on the same boat.
| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *6* | *0* |
| Tasks |  *45*   | *0* | 
| Story Points |  *43*  | *0* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *date* | *#task, ...* | *#task, ...* |  | 
| *3/1/2021* | *#Discussed who is the Scrum master <br /> #Discussed the problem in "Protocol find feature"*| *#Do some search on incoming epics <br /> #thinking about the epics for each new epics* |  |
| *3/2/2021* | *#Created Sprint3.md file and update it <br /> #Discuss how many epics will do <br /> #Created tasks for each epic <br /> #Updated the diagrams in design.md <br /> #decided a meeting time on tuesday and thursday that work for everyone* | *#Working on fixing "protocol find feature" bugs <br /> #Working on starting the "find places" epic* |  | 
| *3/3/2021* | *#Assign jobs for each team member<br /> #solve limit and found issue in "protocol find feature" epic* | *#Working on fixing "protocol find feature" type and where bugs <br /> #Working on the website UI for "find places" epic <br /> #code Smell* |  | 
| *3/5/2021* | *#Fixed protocol find epic bugs<br /> #Created UI and button for find places epic* | *#Assign jobs for each teammate for find places<br /> #Working on link database with Atalas file and completing "find places" epic* |  | 
| *3/8/2021* | *#Finished "find places" epic<br /> #Group meeting discussion for inspection1.md <br /> #Create basic file for "Protocol distance" epic* | *#Refine "Protocol distance" epic*|  | 
| *3/10/2021* | *#Finished "Protocol Distances" epic<br /> #Enable calculate distance functionality <br /> #deploying our server to school server* | *#Working on "Calculate Distance API"*|  | 
| *3/12/2021* | *#Diaplay places details in table and map* | *#Working on tests for "places details" <br /> #Working on connecting distances protocol with server*|  | 


## Review

### Epics completed  

### Epics not completed 

## Retrospective

### Things that went well

### Things we need to improve

### One thing we will change next time
