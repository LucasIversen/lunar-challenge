# Rocket Tracking Backend API

This is my solution to the Lunar rocket code challenge. The project is nodeJS and uses express to handle http requests, as well as JEST for unit testing.

# Setup

Simply clone the repo, run `npm install`, and start the index.js server `node index.js`. If the port does not match the one that your rockets.exe file is pinging, you can change the port in index.js.

# Functionality

Three routes are used in this solution:

**POST /messages**: Handles incoming requests from the rockets.exe program.
**GET /rockets**: Returns an HTML table displaying all rockets.
**GET /rockets/**: Returns the state of a specific rocket.

Incoming messages are processed by the rocketService. Upon receiving a message, the rocket associated with the provided channel is fetched, and previously received message numbers are checked to prevent duplicates. The rocket object is then updated according to the message type using a switch case.

If we were to split this service into multiple microservices, a possible solution would involve having the /messages route add incoming messages to a message queue. Then, smaller services could subscribe to this queue, each handling specific rocket events based on the message type.

# Testing

Unit tests have been created for the functions in the model and service files to ensure proper functionality. You can run the tests with the following command: `npm test`
