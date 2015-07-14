![Cublet Logo](https://avatars2.githubusercontent.com/u/13155509?v=3&s=100)

# Cublet (WebApp)
Cublet is a web app that allows beginners to programming to learn how to program with the Wolfram Language. Considering that the Wolfram Language allows for both imperative and functional style programming, both paradigms of programming can be demonstrated to those planning to get into programming.

This repository holds all the frontend client-side logic of Cublet. Originally, Cublet was just going to parse through results and throw them against a pre-made `APIFunction` Wolfram Cloud API to interpret the Wolfram Language input of the user and get a generated output. However, it grew to an idea of creating an entire ecosystem for Wolfram Language beginners. This Web app utilizes AngularJS for MVC/Separation of Concerns, but because of how platform-agnostic the backend is, Cublet can potentially be deployed to multiple environments.

For authentication, the frontend will have to make an Authorization Header containing a `Bearer <jsontoken>` value, where the `jsontoken` value is obtained upon a login.

Cublet allows users to

* Create an account through the conventional registration, Google oAuth and Facebook oAuth
* Follow other Cublet users
* Have a repository of Wolfram Language code sessions that they have written
* Share the Wolfram Language code sessions they have written with the rest of the world (or have such sessions be private)
* Comment on other site users' Wolfram Language repos
* Create and discuss on forums
	  
## Technologies Used:
* AngularJS
* BootFlat/SASS
* Facebook SDK (Facebook-based logins)

## Dev Process
* Gulp is used for the build step
* If you plan to spin up an instance of Cublet's WebApp for experimental reasons, just edit the `settings` module constants and watch the magic!