## Websultanate assignment
## By - Pratyush Srivastava
## Email - pratyushsri.25@gmail.com
## [Live site](https://webdevtask.netlify.app/)
## [Second link](https://webtask.onrender.com/)

### Backend
To run: npm start
Backend of the app is made using nodejs, api configuration is done using express:
- Imported express and made a simple express server
- Then made a User, article and comment model for the mongodb to manage the storing of data to the database.
- After that made different user routes and article routes to facilitate the server interaction.

### FrontEnd
To run: npm run dev
Frontend of the app is made using Reactjs and made using **vite** as a package
- Made some components and multiple pages to make the frontend
- login and register functionality will be shown as default unless the user logs in.
- home page shows all the data
- all the state of the app is managed using react own built in **Context API** and useReducer hook
