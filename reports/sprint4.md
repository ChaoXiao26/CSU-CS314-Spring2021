# Sprint 4 - *t16* - *404 Brain Not Found*

## Goal
### *Shorter tours!*

## Sprint Leader: 
### *Fan Si*

## Definition of Done

* The Increment release for `v4.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
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

### Protocol tour feature
For this epic there are currently six planned tasks for a total of six story points. The plan is to create json files for both the response and request. Then our team needs to update the microserver and configuration request to reflect the new feature. After that we need to work on the server side files like tourRequest.java and testTourRequest.java. To finish the epic up we will have to create tests in order to maintain a high test coverage.

### Save tour
For this epic, we are going to get the trip waypoints sent from client and save the waypoints as a file, so that user can retrieve the trip created. Epic "Load tour" will be depend on this.

### Shorter tour
In this epic, we will need to use heuristic optimization techniques and concurrency to improve our tour showing, we need to let our website to respond in less than 1 second, and reduce the computation time for the optimization techniques.

### Modify tour

This epic will add a great feature for our users. First we need to have a data structure that we can copy the old order of the old trip while allowing the user to select a new starting point. We also would like to provide the user with the option of reversing the order of the trip while maintaining the starting location. Another task will be allowing the user to reorder the individual destinations. The user will also be provided with functionality to remove individual destinations. A feature we would like to add is to allow the user to add information about individual places as well as correct any wrong information. Lastly we will need a function that will render the updated trip with this new information.

### Search More

This epic adds even more searching capabilities to our program. These additions will be broken down into the following tasks: Match a city, Match a State, Match a Country, Match an airport. This epic should be similar to find places epic except with additional things to match.

### Load tour

This epic will add the functionality such that the user can upload a file containing their own tour. First we will create a button/way for the user to initialize the process of uploading the file. Then the user will be prompted with a form where the file will be selected and uploaded. From the cleint side we will have a function callback to open the file and a function to read from the file. Once the data is validated the tour will be updated with the new data.

## Metrics
During the Sprint 3 we have completed all the epics but left defect in distences and some code smell. In Sprint 4, we will fix our code and implement new fectures for trip. Our goal is to have every team member work together and finish all the epics like what we did in Sprint3.
| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *6* | *count* |
| Tasks |  *30*   | *count* | 
| Story Points |  *32*  | *sum* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *date* | *#task, ...* | *#task, ...* |  | 
| *3/23/2021* | Discussed who will be the sprint leader <br /> Discussed the problem of distances <br /> Discussed the problem of code smell <br /> Created epics and tasks in sprint backlog <br /> #707 & #708 & #713, Completed design.md | *Research for incoming epics* |  |

## Review

### Epics completed  

### Epics not completed 

## Retrospective

### Things that went well

### Things we need to improve

### One thing we will change next time
