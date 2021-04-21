# Sprint 5 - *t16* - *404 - Brain Not Found*

## Goal
### *User Experience!*

## Sprint Leader: 
### *Tomas Vasquez*

## Definition of Done

* The Increment release for `v5.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
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

### Server Settings

This epic will present the user with all available features. It will also allow the user to see which server is currently in use. Lastly it will suggest other server to connect too. Adequate tests will be created in order to boost test coverage. If this is all done properly, then interoperability will be an easier task to accomplish.

### Shorter tour

In this epic, we will need to use heuristic optimization techniques and concurrency to improve our tour showing, we need to let our website to respond in less than 1 second, and reduce the computation time for the optimization techniques. To do this, we will translate three algorithms into code: 2-opt, 3-opt, and nearest neighbor. To determine the correct optimization technique, we will have a check that determines which to use. We will also create adequate tests for each new method introduced.

### Modify tour

This epic will add a great feature for our users. First we need to have a data structure that we can copy the old order of the old trip while allowing the user to select a new starting point. We also would like to provide the user with the option of reversing the order of the trip while maintaining the starting location. Another task will be allowing the user to reorder the individual destinations. The user will also be provided with functionality to remove individual destinations. A feature we would like to add is to allow the user to add information about individual places as well as correct any wrong information. Lastly we will need a function that will render the updated trip with this new information.

### User Experience

In this epic, we will need to let other students or friends to take a look of our website and get some feedback from them. We will focus on the user experience for moblie user, and try to minimum the misunderstand in our website page, including show the fewest visual elements possible at a time, minimal scrolling required, and consistent with CSU web style guidelines and more if we found.

### Filter tour

In this epic, we will need to allow user to find and view a subset of the tour or search results when they get long, including let the user enter a search string and show only a portion of the tour or search results for matching item(s).
### Save tour
We will continue to work on this epic carried over from last sprint. The user would like to save their tour and map. The user is currently able to save their Tour in csv and JSON formats. To complete this epic we need to implement a function to save the map in SVG and KML formats.

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
