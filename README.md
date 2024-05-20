# 👁️ShutterSpaces👁️

This project is our submission for the L.O.C 5.0 Hackathon by DJSCE ACM Chapter in Vile Parle, Mumbai. This application aims to provide digital photographers with a platform to increase their sources of revenue in the decade of 2020s as Artificial Intelligence based photography is on the rise. This application will also help photographers to get more exposure and recognition for their work.

<details>
  <summary>Table of Contents</summary>

- [👁️ShutterSpaces👁️](#️shutterspaces️)
  - [Hackathon Details](#hackathon-details)
  - [Team Members](#team-members)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
  - [How to run the project](#how-to-run-the-project)
      - [Cloning the repo](#cloning-the-repo)
      - [Starting the server](#starting-the-server)
      - [Starting the client](#starting-the-client)
  - [Contributing](#contributing)
  - [Project Maintainer(s)](#project-maintainers)
</details>

---

## Try it out! 

[https://shutterspaces.netlify.app/](https://shutterspaces.netlify.app/)

## Hackathon Details

- **Name**: L.O.C 5.0
- **Team Name**: Team Skunk Devs 
- **Probem Statement**: PS 6-OPEN INNOVATION : Photography
- **Time**: 24 hours
  
## Team Members

| <img src="https://github.com/vishal-codes.png?size=150" width="150" height="150"> | <img src="https://github.com/manastelavane.png?size=150" width="150" height="150"> | <img src="https://github.com/bhargavmodak.png?size=150" width="150" height="150"> | <img src="https://github.com/Anil-yadav-0712.png?size=150" width="150" height="150"> | <img src="https://github.com/ShreyashkaPatel.png?size=150" width="150" height="150"> |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| [Vishal Shinde](https://github.com/vishal-codes)                                  | [Manas Telavane](https://github.com/manastelavane)                                 | [Bhargav Modak](https://github.com/TheBrahmnicBoy)                                  | [Anilkumar Yadav](https://github.com/Anil-yadav-0712)                                | [Shreyashka Patel](https://github.com/ShreyashkaPatel)                               |    [Pranitha Cuddapah](https://github.com/prani02)   |  [Anushka Bhilare]()


## Tech Stack

- **Frontend**: ReactJS
  - **Libraries**: React Router, Material UI, React-Redux Toolkit, Axios, React-Quill, Socket.io-client
  - **State Management**: Redux
  - **Image Bucket**: Appwrite
  - **Real-time Communication**: HMS Video SDK, Socket.io
  - **Image Optimization**: ImageKit
  - **Authentication**: JWT
  - **Testing**: Jest, React Testing Library
  - **Performance Monitoring**: Web Vitals

- **Backend**: Node.js, Express.js
  - **Libraries**: Express, Mongoose, Socket.io, jsonwebtoken, dotenv, uuid4
  - **Database**: MongoDB
  - **Authentication**: jsonwebtoken
  - **Performance Monitoring**: Web Vitals

## Installation

- This project was built with `vite`, so you'll need to have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed on your machine to run it.
- Check out [How to Install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) for instructions on how to install them.
- Once you have those installed, you can follow these steps to get the project up and running:

  1. Clone this repository to your local machine. [Cloning a repository ↗️](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
  2. Navigate to the project directory in your terminal. [Navigating the command line ↗️](https://www.digitalcitizen.life/command-prompt-how-use-basic-commands/)

- Note that you will also need to obtain the [environment variables](https://kinsta.com/knowledgebase/what-is-an-environment-variable/) for the server and client in order to run the project. To do this, please contact one of the project maintainers listed below.
- Add the environment variables to a `.env` file in the server and client directories. The file structure should look like this:

```
ShutterSpaces
├── client
│   ├── .env
│   ├── package.json
│   └── ...
├── server
│   ├── .env
│   ├── package.json
│   └── ...
└── ...
```

## How to run the project
#### Cloning the repo
1. Open a terminal window.
2. Run `git clone https://github.com/Evozone/shutter-spaces.git` to clone the repo.
3. Run `cd shutter-spaces` to enter the project directory.

#### Starting the server
1. Run `cd server` to enter the server directory.
2. Run `npm install` to install the server dependencies.
3. Run `npm run dev` to start the server.

#### Starting the client
1. Open a new terminal window.
2. Change the directory to the project directory.
3. Run `cd client` to enter the client directory.
4. Run `npm install` to install the client dependencies.
5. Run `npm run dev` to start the client, since this is vite.

Open `http://localhost:5173` in your browser to view the application.

## Contributing

The project is currently in a closed alpha stage. To make contributions, contact the project maintainers listed below. You will need to be added as a collaborator of the repository to get access to the project.
