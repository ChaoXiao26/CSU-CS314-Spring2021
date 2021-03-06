# Interop for t16

Interoperability testing allows us to verify correct operation when connected to another team's client or server.
Each member of your team must verify interoperability with the client and server from another team as specified in the assignment.
You should verify each of the different aspects of the protocol that has been implement:  config, find, distances, tour.
 
### Other Teams

This table lists each student in the team and the team they verified interoperability with.

| Name | Team |
| ---- | ---- |
| Yuxin | t13 |
| Tomas | t06 |
| Sam   | t09 |
| Fan   | t10 |
| Mark  | t14 |

### Problems found

These problems were found when connecting our client to another team's server or the other team's client to our server using the server settings configuration in the footer.
The C/S column should specify either client or server, denoting which part of the other team's system you were testing.
You should discuss the issues found with the other team and create defects in GitHub for any problems found in your system.

| team | C/S | problem | github# |
| :--- | :---: | :--- | --- |
| t09 | s | initial connection error | #1006 |
| t09 | c | no issue |  |
| t13 | c | no issue |  |
| t13 | s | no issue |  |
| t06 | s | no issue |  |
| t06 | s | no issue |  |
| t10 | c | no issue |  |
| t10 | s | ERR_CONNECTION_REFUSED | #1016 |
| t14 | c | no issue |  |
| t14 | s | no issue |  |
