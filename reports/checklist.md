# Inspection Checklist for t16

The goal of an Inspection is to file defects.
This checklist is our guide to help us look for defects.
The checklist will be updated as we identify new faults in our code that we wish to prevent in future inspections.


### Data faults
* Are all program variables initialized before their values are used?
* Have all constants been named?
* Should the upper bound of arrays be equal to the size of the array or size-1?
* If character strings are used, is a delimiter explicitly assigned?
* Is there any possibility of a buffer overflow?

### Control faults
* For each conditional statement, is the condition correct?
* Is each loop certain to terminate?
* Are compound statements correctly bracketed?
* In case statements, are all possible cases accounted for?
* If a break is required after each case in case statements, has it been included?

### Parameter faults
* Are all input variables used?
* Are values assigned to all output variables before they are output?
* Can unexpected inputs cause corruption?

### Interface faults
* Do all functions and methods have the correct number of parameters?
* Do formal and actual parameter types match?
* Are the parameters in the right order?
* Do all components use a consistent model for shared memory structure?

### Storage faults
* If a linked structure is modified, have all links been correctly diagnosed?
* If dynamic storage is used, has space been allocated correctly?
* Is space explicitly deallocated after it is no longer required?

### Exception faults
* Have all possible error conditions been considered?

### Readability
* Are the functions broken down to small chunks?
* Do variables, functions, classes have a good clear naming structure?
* Is the code easy to follow?

### Test coverage
* Has 70% of the code been tested?
* Have all the improtant functions been tested?
* Are the tests readable and maintainable?

### Maintainability
* No hardcoded configurations
* No useless code in files/no code that was slated to be deleted remains.
* Have minimal comments, if comments are necessary, they are descriptive and purpouseful. 
* Proper organization of the code. Most abstract to most specific.
* Functions follow an easy to read progression. Methods called in one function follow directly after it.
