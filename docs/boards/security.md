# Boards Cloud Security

<!-- TOC depthFrom:3 depthTo:3 withLinks:1 updateOnSave:1 orderedList:0 -->

<!-- /TOC -->

### How does an end user login to Boards?
- Users login by authenticating via OAuth 2.0 with Connections Cloud, Office365, Facebook, Google, LinkedIn, Connections on-premise or Auth0.
- This starts a token-based session with Boards Cloud used to authenticates all future requests.

### What kind of Provider (Connections Cloud, Office365 etc) data will be stored by Boards Cloud?
- Basic user profile data (display name, email, subscriberId, customerId)
- User/community photo
- Community/Space name and members
- Links to Files
- Clone of Connections Activities data after imported by the user

### What is the security of data in motion?
#### Requests between the User and Boards Cloud servers are secured by:
- Encrypted by HTTPS (SSL)
- Authenticated using both
  - token-based sessions for all API data
  - cookie-based session for all images

#### Requests between Boards Cloud servers and Mongo database are secured by:
- Encrypted by HTTPS (SSL)
- Authenticated using username/password
- IP whitelisting

#### Requests between Boards Cloud servers and Google Cloud S3 Object Storage are secured by:
- Encrypted by HTTPS (SSL)
- Authenticated using username/password
- Internal Google network - data is not communicated over the public internet

#### Requests between Boards Cloud servers and providers (Connections, Office365 etc) are secured by:
- Encrypted by HTTPS (SSL)
- Authenticated using OAuth2 access tokens

#### Other remarks:
- Boards Cloud is hosted by Google Cloud in the EU West region
- CSRF is not a threat as all our APIs are strictly JSON and we don't support CORS.
- We use token based express-sessions and helmetJS for express to provide additional security around XSS, framing, and sessions. Tokens are JWT encoded with secret keys.
- SQL injection is not relevant as we are not using any SQL dbs.
- We use Content-Security-Policy headers to limit framing to only be self and Connections Cloud to prevent clickjacking
- We add X-Content-Type header 'nosniff' to prevent Content sniffing
- We use a standard REST API pattern. Entity IDs are passed as URL params where applicable for all http requests (GET, POST, PUT, DELETE). No actual data is passed as URL params or query params.

### What is the security of data at rest?
Most data is stored in MongoDB hosted by MongoDB Atlas in a Google Cloud datacentre (EU West).  User images are stored in Google Cloud Object storage.

#### MongoDB Atlas is secured by:
- Two Factor Authentication
- IP Whitelist
- Encryption at rest - AWS Key Management Service (AWS KMS) to encrypt storage engines and cloud provider backups
- Each MongoDB Atlas group is provisioned into its own VPC, thus isolating your data and underlying systems from other MongoDB Atlas users
- Network encryption and access control
- All security-specific updates to the operating system and database of the underlying instances are automatically applied by MongoDB engineers.
- MongoDB, Inc. is also certified under the EU-US Privacy Shield.
- More information about MongoDB Cloud Services Compliance and Privacy can be obtained [here](https://www.mongodb.com/cloud/compliance)

#### Google Cloud Object storage is secured by:
- No external access other than our server
- S3 standard token/secret authentication
- Encrypted by HTTPS (SSL)

### Are there any passwords saved by Boards Cloud?
There are NO passwords stored by the app.
