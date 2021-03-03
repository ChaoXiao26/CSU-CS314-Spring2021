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


## Review

### Epics completed  

### Epics not completed 

## Retrospective

### Things that went well

### Things we need to improve

### One thing we will change next time
