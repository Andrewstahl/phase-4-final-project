# Stahl's Habit Tracker

This is the repository of my Phase 4 final project for Flatiron School.

*This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It was also built using Ruby v2.7.4 on Rails v7.0.4*

[Check out the live version of project (hosted on Render)](https://stahl-habit-tracker.onrender.com)

## Goal

The goal of this project is to create a single-page application by leverage my knowledge of the following:
- Ruby
- Rails
- PostgreSQL
- Active Record
- JavaScript
- React
- client-side routing
- server-manipulation
- sessions/cookies
- login authentication
- APIs

## Getting Starting
Before you begin, you will need to install dependencies and run individual servers on the client-side and server-side modules. For the client-side, you will want to run `npm install --prefix client` to install the client dependencies for this project and `npm run --prefix client` to start the server. In a separate terminal, run `bundle install` to install the server dependencies. Then, run `rails db:migrate db:seed` to create the migrations and seed the database. Finally, run `rails s` to start the server.

## PostgreSQL Database
I built this project using a PostgreSQL database since that allowed me to deploy my code to the Render platform. As such, one of the Ruby dependencies was the pg gem (you can see this by going to the Gemfile in the root directory of this repository). There are some details included on [the Flatiron School starter code for our React-Rails repository](https://github.com/learn-co-curriculum/project-template-react-rails-api). You can walk through those steps to learn more on the deploying process.

## Project Overview
This app acts as a habit tracker and log for users to live their best lives. Whether you want to start exercising or quit smoking, this will help you hold yourself accountable and check in with that's most important to you. This leverages a homegrown API utilizing Ruby, ActiveRecord, and Sinatra with separate but connected databases for users, habits, and logs.  Leveraging React, the client-side also uses different links that render data pertinent to what the user wants to see.

Check out this gif for a quick walkthrough of the final project (this might take about 15-25 seconds to load):
![](https://github.com/Andrewstahl/phase-4-final-project/blob/main/media/Flatiron%20Phase%204%20-%20Habit%20Tracker%20Walkthrough.gif)

## Database Migration Structure
Here is a quick visual for the database structure.
![](https://github.com/Andrewstahl/phase-4-final-project/blob/main/media/Flatiron%20Phase%204%20DB%20Structure%20-%20Habit%20Tracker.png)

## Pages
### **Login**
The "Login" page will allow the user to log into their account with their credentials. If they enter in incorrect credentials, it will prompt the user with applicable errors. The user can also select to signup if they want to create a user account from scratch.

This page uses cookies and sessions within the browser. If the browser is set to not store cookies, the login won't work.

### **Habits**
The default home page brings up to the "Habits" page. This gives the user a list of all of the habits their tracking and the ability to add new habits to the list. 

### **Log**
The "Log" page will show all log entries that the user has made about their habits. When creating a new log, the user will be prompted to select one of their habits. If a new habit is created on the "Habits" page, it will be available for immediate use on the "Log" page.

### **Profile**
The "Profile" page will allow the user to change their credentials. They can change their username or password and fully delete their account. If the fetch request to change the information returns an error, the user will get a pop-up notifying them that the account update has failed. If they are successful in changing their account, it will give them a success pop-up. If they fully delete their account, it will kick the user back to the login page.

## Future Development
- Additional password validations (capital letter, lowercase letter, number, etc.) with visual cues on password creation
- Toggle password visibility
- Filter for specific habits on the Log page
- Seeing all other habits that other users have added
- Adding friends based on the other users on the platform
- Liking/Commenting on other people's logs
- Date validation to ensure logs cannot be created for a future time/date

## Resources
- [Live version of project (hosted on Render)](https://stahl-habit-tracker.onrender.com)
- [Flatiron starter code for React-Rails repository](https://github.com/learn-co-curriculum/project-template-react-rails-api)
- [Create-React-App for starter client repository](https://github.com/facebook/create-react-app)

## Additional Posts
- [YouTube walkthrough of the project](https://youtu.be/usV88ABxVno)
- [Medium blog post about getting started with cookies and sessions on Rails](https://andrewstahlsoftware.medium.com/getting-started-with-cookies-session-management-ruby-on-rails-project-7878d8995cce)

