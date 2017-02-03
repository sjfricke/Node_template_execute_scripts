# Node_template_execute_scripts

This is made for someone who wants to write some scripts in C, C++, Python, etc and wants to to be able to not worry about learning NodeJS and how to set up a back end

This works for Windows, MacOS, and Linux

-----
## How to setup

**Pre-requisites**: [NodeJS](https://nodejs.org/en/)

> To check if you have Node open a terminal and type `node -v`

To run this is **VERY** simple

1. Clone the repo
  * `git clone https://github.com/sjfricke/Node_template_execute_scripts.git`
2. Using the terminal (or command prompt if Windows) get to the directory you just cloned
  * `cd path/to/Node_template_execute_scripts`
3. run `npm install`
  * this will load the libraries you need
4. run `node server.js /path/to/my/script`
  * other options and details about this line below
5. Open URL it gives you in a browser and away you go!
6. **Optional** I included a simple file to test
   * run `gcc toUpper.c -o toUpper`
   * then run `node server.js toUpper`

## Options

These are options to pass to

* No parameters
  * Example: `node sever.js toUpper`
* `-p`
  * Allows you pick a different to host site on
  * Default is 5000
  * Example: `node server.js toUpper -p 8080`

## Running server Forever

If you want to run your program even when your terminal is not open you can use the [Forever npm tool](https://www.npmjs.com/package/forever)

To run use `forever start --spinSleepTime 10000 server.js path/to/script`

**NOTE** You may have to run `npm install forever -g` which puts the forever program as a global program
