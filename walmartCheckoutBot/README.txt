Checkout Bot for Walmart(GUEST CHECKOUT)

This program performs an 'autocomplete' of the neccessary information
needed make a purchase on the Walmart website using Node.js and Puppeteer.
Since this program is specifically for a 'Guest Checkout' the program request 
the users information such as firstName, lastName, etc., 
and when the browser is loaded, it inputs that information 
and creates a new account. The purpose of this project
is to make it easier for me to checkout items that I want.
**Eventually I'll create a webpage that you can input this info into** 

Technologies Used
- Node.js

Prerequisities
- npm install puppeteer-extra-plugin-stealth
- npm install puppeteer-extra
- npm install http-proxy

Installation Instructions

1. Clone the repository from GitHub https://github.com/MirMoneyJ/walmartGuestBot
2. Make sure all the required imports and npm installs are present
3. Fill in the user information at the top
4. run 'node bot.js' to start