![logo friendship](https://raw.githubusercontent.com/NathanNeelis/Project-Tech/master/Styleguide/guide/Friendship_logo-full-RGB_2.jpg)

## Description

Friendship is a dating service, not meant for romantic relationships but for friendships. Do you feel alone sometimes and would you like to get in touch with people that have the same interests as you? Then Friendship is here to help! With friendship you’ll create a profile with your interests, for example, going to the gym, playing board games, or videogames, or gardening. After you have created your profile, you’ll be able to search other profiles for specific interests. Let’s say you would like to play a board game, in the filter function you will let our database know to filter out people that are also interested in board games. When you find some suitable matches based on age, location, you can get in contact with other “board gamers” and see if they’re up for a game.

## Table of Contents
* [Description](https://github.com/BVictorB/friendship/tree/improvement/readme#description)
* [Job stories](https://github.com/BVictorB/friendship/tree/improvement/readme#job-story)
* [Project status](https://github.com/BVictorB/friendship/tree/improvement/readme#status)
* [The application](https://github.com/BVictorB/friendship/tree/improvement/readme#the-application)
* [Templating engine](https://github.com/BVictorB/friendship/tree/improvement/readme#templating-engine)
* [Our code standards](https://github.com/BVictorB/friendship/tree/improvement/readme#code-standards)
* [The dataflow](https://github.com/BVictorB/friendship/tree/improvement/readme#dataflow)
* [Our wiki](https://github.com/BVictorB/friendship/tree/improvement/readme#wiki)
* [Planning](https://github.com/BVictorB/friendship/tree/improvement/readme#planning)
* [License](https://github.com/BVictorB/friendship/tree/improvement/readme#license)
* [Resources](https://github.com/BVictorB/friendship/tree/improvement/readme#resources)

## Job story

### Filtering

**When** I'm bored at home, at the beginning of the evening, watching cooking shows on Netflix, while I'm already done with all my homework  
**I want to** find people that have the same interests as me  
**So I** can ask them if they want to do something fun that is in both our interests.

### Login / register

**When** I am sitting at home all alone, **I want to** be able to create an account with ease at a dating website to be able to match with other people and finally find someone **So I** won't feel alone anymore. I want to be able to do this from anywhere and any device, and also with as little effort as possible

### Matching

**When** I am at home in the evening with my laptop on the couch and see a profile of a person that I like, **I want to** have a reason to talk to her. When she also likes me I would like to discuss philosophical questions **So we** can get to know each other better and might get to a relationship.

## Status

At this moment this is a work in progress.
Our goal is:

- Users are able to register an account **Must have**;
- Users are able to log in and logout **Must have**;
- Users are able to filter for specific interests **Must have**;
- There are specific interest sections on various pages **Must have**;
- Users are able to like other users **Must have**;
- If users like each other they become a match **Must have**;
- The user can also unmatch the other user if he wants to **Must have**;
- When a user registers he needs to activate his account by mail **Nice to have**;

## The application

### Homepage
On the homepage, you see some other users that you might like.  
Depending on the weather there is a suggestion section that suggests finding people to sport with if the weather is nice or people to play some games with if the weather is not so good. This is done by checking the location of the registered user and referring it to the weather in his town via an API.

<img width="600" alt="homepage_friendship" src="https://user-images.githubusercontent.com/55492381/85339556-b0349280-b4e4-11ea-94ff-fb3bf57bc8fe.jpg">

### login
If you want to use our application, you have to log in! This can be done via the login form.
It checks the email and the hashed password with the database. If it matches the user gets logged in, if not, then he might need to create an account.

<img width="600" alt="loginpage_friendship" src="https://user-images.githubusercontent.com/55492381/85339565-b4f94680-b4e4-11ea-843e-9d538ceafa91.jpg">

### Register
If the new user doesn't have an account yet, he can register via our registration form. Fill in your personal details, email, and your password to create an account. Don't forget to fill in your interests, because that is what lets other users find you!

<img width="600" alt="registerpage_friendship" src="https://user-images.githubusercontent.com/55492381/85339582-bb87be00-b4e4-11ea-8786-6f711d1273f2.jpg">

### Search for other people
If you want to find other users by their interest you can type in the activity you would like to find someone for on the search page. Our search engine will show you the results of matching profiles for your choosing activity.

<img width="600" alt="searchpage_friendship" src="https://user-images.githubusercontent.com/55492381/85339583-bc205480-b4e4-11ea-9972-c38366310636.jpg">


### Like someone
If you found someone that you would like to befriend, meet, or participate with for an activity you can like that user. Simply by going to their profile and hitting the like button!

<img width="600" alt="searchpage_friendship" src="https://user-images.githubusercontent.com/55492381/85375874-38dc1e80-b537-11ea-8703-0fa0fbddb67c.jpg">

### It's a match!
When you both have liked each other then you have been matched. Your profiles will show up on both of your matches pages and when you go to the profile there is an option to get in contact.

<img width="600" alt="searchpage_friendship" src="https://user-images.githubusercontent.com/55492381/85339578-b9bdfa80-b4e4-11ea-855b-234331be47eb.jpg">

#### Your profile
If you want to check out your own details, you can check out your profile page. Here you also have the ability to change the details and add or remove one or more of your interests.

<img width="600" alt="searchpage_friendship" src="https://user-images.githubusercontent.com/55492381/85339581-baef2780-b4e4-11ea-970d-b249061a26c5.jpg">

## Getting started

In this project, we used node.js and NPM to install packages.  
To install all the packages registered in the package.json file run the code below after downloading this project.

    $ git clone https://github.com/BVictorB/friendship.git .

        $ npm install


### Templating engine

In our Friendship app, we made a lot of use of the templating engine EJS.  
We choose to use EJS because two out of three team members were already using EJS. Also, it has great documentation on how to get started.  
Another team member used handlebars but we felt most comfortable using EJS.

In the view folder, you will find our main pages like index, profile, matching, register, login, and search.  
These pages are build out of includes. Smaller bits of code that you will find in the folder **"includes"**.

![EJS](https://i0.wp.com/frontnet.eu/wp-content/uploads/2020/04/Javascript_Embedded.png?w=526&ssl=1)

## Code standards

We choose to use ESlint to force our code standards.  
The most important code standards are:
- We write in ES6
- So using arrow functions =>
- Also using const and let instead of VAR
- We loop with forEach
- We use Single quotes
- We always end with a semicolon;
- Line endings are Unix.
  
For more information about our code standards, [check out wiki page!](https://github.com/BVictorB/friendship/wiki/Code-Standards)

## Dataflow
![Dataflow](https://user-images.githubusercontent.com/55492381/85284483-92890e00-b48f-11ea-81c9-10916d91493e.jpg)

For more information about our database choices, structure en set up [check out our database wiki page!](https://github.com/BVictorB/friendship/wiki/Database)


## Wiki

A lot of our research has been documented in the wiki of this repository.  
Are you interested in our research, design choices, or learning progress?  
[**Check out our wiki here**](https://github.com/BVictorB/friendship/wiki)

## Planning

We used the GitHub projects feature for our planning.  
To see what steps we have taken in making this application please see our project page.
[Friendship planning board](https://github.com/BVictorB/friendship/projects/1)

## License

[MIT](https://github.com/BVictorB/friendship/blob/master/LICENSE)

## Resources

EJS. (n.d.). Logo EJS [Logo]. Retrieved from https://i0.wp.com/frontnet.eu/wp-content/uploads/2020/04/Javascript_Embedded.png?w=526&ssl=1  
Shiva. (n.d.). Form [Icon]. Retrieved from https://thenounproject.com/search/?q=form&i=2034112  
Creative Stall. (n.d.). database [icon]. Retrieved from https://thenounproject.com/search/?q=database&i=996054  
Lil Squid. (n.d.). user [icon]. Retrieved from https://thenounproject.com/search/?q=user&i=26029  
Joseph , W. (n.d.). profile [icon]. Retrieved from https://thenounproject.com/search/?q=profile&i=95876  
Alice Design. (n.d.). Login [Icon]. Retrieved from https://thenounproject.com/search/?q=3407301&i=3407301  
Iconixar. (n.d.). Mathcing [Icon]. Retrieved from https://thenounproject.com/search/?q=2663984&i=2663984  
Adams, B. (n.d.). Heartbreak [Icon]. Retrieved from https://thenounproject.com/search/?q=952943&i=952943  
Praveen Patchu. (n.d.). Like [Icon]. Retrieved from https://thenounproject.com/search/?q=986852&i=986852  

