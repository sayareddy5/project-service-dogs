# Inspiration and Content Source

This website design and content have been inspired by guidedogs.com. The overall layout, color scheme, and certain elements of this website have been influenced by the design of guidedogs.com. Additionally, some content has been sourced from guidedogs.com for the purpose of this capstone project. Please note that this content is used for educational and demonstration purposes only and is not intended for commercial use.

## Instructions for starting the app

- Change directory to the root directory of the project.
- Create a .env file and store your google client id and secret id in variables

  - GOOGLE_CLIENT_ID = "your client id"
  - GOOGLE_CLIENT_SECRET = "google secret id"

  If you do not have a client Id, please follow the instructions in the given link https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid and create client Id and secret Id.

- This app used nodemailer package to send reset mail
- if using less secure mail providers we can easilty setup nodemailer Email and password in .env file ,if using gmail, create an app password in gmail account.

  - EMAIL_SERVICE = 'email service provider'
  - EMAIL_ID = 'your email id'
  - EMAIL_PASSWORD = 'your password'

- Also create a session secret key with value in .env

  SESSION_SECTRET = "your secret"

- The port number the app use by default is '3000'. If you want to use different port number , create a port key and number in .env file

  - PORT = 3004

- run command "npm install". This will install all the necessary packages used in the project.

- run command "node app.js". This will startup the local server. Naviagte to any browser
  and got to http://localhost:3000 . Note: the app url is 3000 by default, use your port number if changed the default.
