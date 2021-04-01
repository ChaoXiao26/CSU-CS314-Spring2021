# Interop for t16

Interoperability testing allows us to verify correct operation when connected to another team's client or server.
Each member of your team must verify interoperability with the client and server from another team as specified in the assignment.
You should verify each of the different aspects of the protocol that has been implement:  config, find, distances, tour.
 
### Other Teams

This table lists each student in the team and the team they verified interoperability with.

| Name | Team |
| ---- | ---- |
| Sam | t17 |
| Fan | t25 |
|  |  |

### Problems found

These problems were found when connecting our client to another team's server or the other team's client to our server using the server settings configuration in the footer.
The C/S column should specify either client or server, denoting which part of the other team's system you were testing.
You should discuss the issues found with the other team and create defects in GitHub for any problems found in your system.

| team | C/S | problem | github# |
| :--- | :---: | :--- | --- |
| t17 | c | no issues? |  |
| t17 | s | initial configuration error right when we switch over |  |
| t25 | c | no issue |  |
| t25 | s | POST https://localhost:3141/api/config net::ERR_CONNECTION_REFUSED |  |
