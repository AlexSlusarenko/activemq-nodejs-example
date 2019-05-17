## Overview
Example of usage [rhea](https://www.npmjs.com/package/rhea) library to connect nodejs application with ActiveMQ

Main discovered features:
 - prefetch count (process limited number of messages)
 - confirm messages (remove message from broker only after it confirmed)

## Dependency

ActiveMQ running locally, in docker or AWS instance
Docker example:
 
`docker run -d --name='activemq' -p 8161:8161 -p 61616:61616 -p 61613:61613 -p5673:5672 -p1883:1883 webcenter/activemq:5.14.3`

## Running
 
 `npm start`
 
 or
 
 `node ./src/index.js`
 
## Development Tooling
 
 - [ActiveMQ](https://nodejs.org/en/)
 - [npm](https://www.npmjs.com/)
 - [Node v8.15.0 or v10.15.3](https://nodejs.org/uk/download/) 