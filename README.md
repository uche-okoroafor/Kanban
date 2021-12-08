## Kanban

This is a website that makes it easier for dog owners to find a dog sitter.

**Tech Stack:** MongoDB, Express.js, React.js, Node.js, Typescript

**Contributors**: Ankit Babber, Peter Logo, Uche, Antwi

---

## Built With:
### Frontend
* [React/Typescript](https://reactjs.org/) - The framework used for developing the components and UI.
* [Material UI](https://material-ui.com/) - Javascript framework for styling and CSS compartmentalization.


### Backend 
* [Node JS](https://reactjs.org/)/[Express JS](https://expressjs.com/) - Backend used for our API routes.
* [Mongo DB/Atlas](https://www.mongodb.com/) - Database used to store our user and application data.
* [Socket.IO](https://socket.io/) - JavaScript library for creating real-time lobby and interview rooms.


## Features:
* Login/sign up flow with e-mail address
* Create boards
* Create columns
* Create cards in columns
* Add descriptions in cards (e.g. deadlines, descriptions, comments, attachments,  etc.)
* Drag cards to different columns
* Archive cards once completed
* Convert kanban board into a calendar view



## Installation:
If you want to run the application locally, follow the instructions below:
1. Clone repository
2. Install Dependencies - Run ```npm install``` in the root directory and client directory
3. Create a file with the name ```.env```
4. Add the application secret key for authentication using ```SECRET_KEY``` to ```.env```
5. Add the application mongo uri ```MONGO_LOCAL_URI``` to ```.env```. Additional information to run mongoDB locally can be found [here](https://docs.mongodb.com/manual/installation/). Alternatively you can use Mongo Atlas [here](https://www.mongodb.com/cloud/atlas).
6. To run code from the code editor, create an account on [glot.io](https://glot.io/). You can find your api key after registering [here](https://glot.io/account/token). Add glot token ```GLOT_TOKEN``` to ```.env```.
7. Sign up for [AWS S3](https://aws.amazon.com/s3/) and add ```S3_ACCESS_KEY```, ```S3_ACCESS_SECRET``` and ```S3_BUCKET_NAME``` to ```.env```
8. Final ```.env``` appear should like below: 
```
SECRET_KEY=<Secret key for passport.js>
MONGO_LOCAL_URI=<Your mongo uri>
GLOT_TOKEN="Token <Your glot token>"
S3_ACCESS_KEY=<Your S3 access key>
S3_ACCESS_SECRET=<Your S3 secret>
S3_BUCKET_NAME=<Your bucket name>
```
9. Run ```npm run dev``` to start the server on the root directory and ```npm start``` on client to start the application

### Demo

1. Registration. Users will be able to create a new account using their email and password

![Signup Demo](demo/images/signup.png)

2. Dashboard. Here is a description about what a user can expect to see

![Dashboard](demo/images/dashboard.png)
