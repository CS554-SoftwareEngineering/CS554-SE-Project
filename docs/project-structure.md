# Overall project structure

## Presentation / User Interface: HTML, CSS, JavaScript, React

The main user interface that the players will be interacting with will be created mainly with the front-end Javascript framework React. React provides more than enough functionality for the purposes of this project and as a collective, our previous knowledge of the framework will guide us in creating the front-end portion of the trivia game.

## Data File: Json file or Database

In order to store the list of trivia questions as well as their answers, we intend on either using a lightweight data exchange format in JSON or create a database (SQL Server, PostgreSQL, etc) that would be available to query. Depending on the progress we make during our sprints and how the development goes, we plan on selecting the one that will suit the project best.

## Server Connection: SocketIO

To establish a two way connection between the players that will be participating in the trivia game as well as the server, the SocketIO library will be utilized. 

## Backend: JavaScript, NodeJS, Express, SocketIO

The trivia game will be run in the backend mainly through NodeJS because the npm registry provides our team with a vast number of packages that we felt would be sufficient in creating the server-side portion of the application.