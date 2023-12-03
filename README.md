# Inspiration and Content Source

This website design and content have been inspired by guidedogs.com. The overall layout, color scheme, and certain elements of this website have been influenced by the design of guidedogs.com. Additionally, some content has been sourced from guidedogs.com for the purpose of this capstone project. Please note that this content is used for educational and demonstration purposes only and is not intended for commercial use.

## Instructions for starting the app

- Change directory to the root directory of the project.
- Create a .env file and store your google client id and secret id in variables

  - GOOGLE_CLIENT_ID = "your client id"
  - GOOGLE_CLIENT_SECRET = "google secret id"

  If you do not have a client Id, please follow the instructions in the given link https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid and create client Id and secret Id.

- This app used nodemailer package to send reset mail since this is a free server expect some latency and error sending emails to the user, use another service provider based on requirement.
- if using less secure mail providers we can easilty setup nodemailer Email and password in .env file ,if using gmail, create an app password in gmail account.

  - EMAIL_SERVICE = 'email service provider'
  - EMAIL_ID = 'your email id'
  - EMAIL_PASSWORD = 'your password'

- Also create a session secret key with value in .env

  SESSION_SECTRET = "your secret"

- The port number the app use by default is '3000'. If you want to use different port number , create a port key and number in .env file

  - PORT = 3004

-
- run command "npm install". This will install all the necessary packages used in the project.

- run command "node app.js". This will startup the local server. Naviagte to any browser
  and got to http://localhost:3000 . Note: the app url is 3000 by default, use your port number if changed the default.

- Setting Up AWS Keys and S3 Bucket
  AWS Access Key and Secret Access Key:

  Follow the [Official AWS documentation](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys) to create Access Key and Secret Access Key.

- AWS S3 Bucket:

  Follow the [official AWS documentation](https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html) to create an S3 Bucket.

- Setting Up MongoDB Database

  [MongoDB Atlas](https://www.mongodb.com/basics/create-database):

  Create a new cluster, and follow the setup instructions provided by MongoDB Atlas.
  MongoDB Connection String:

  Retrieve the connection string from MongoDB Atlas, including the username and password.
  Environment Variables:

  Set the MONGO_DATA_ID to your MongoDB username and MONGO_DATA_PASSWORD to your MongoDB password.
  Remember to keep your .env file secure and not share sensitive information.

- AMAZON_ACCESS_KEY = 'access key'
  AMAZON_SECRET_ACCESS_KEY = 'secret access key string'
  AMAZON_REGION = 'region'
  S3_BUCKET = 'bucketname'
  MONGO_DATA_ID = 'userid'
  MONGO_DATA_PASSWORD = 'password'

# Note:

Make sure to replace the placeholder values with your actual credentials.
