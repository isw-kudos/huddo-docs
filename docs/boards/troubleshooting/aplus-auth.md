### Testing an oauth2 connections configuration

The steps below will test a Huddo Boards / Activities Plus oauth setup.

> We will prepare a request in an api testing tool, then get a response code from connections and finally use that code in the prepared response to get an auth token. It is important to do in this order as the code is only valid for a minute.

#### Block requests to boards

  Update WAS httpd.conf

  change ProxyPass and ProxyPassReverse entries for `/boards` to use a different (invalid) port number.

#### Install and open postman or another api testing tool

#### In postman prepare a request as below


  Method: POST

  Request URL: https://(connections url)/oauth2/endpoint/connectionsProvider/token

  On the Body tab, select `x-www-form-urlencoded` and fill in the following:


  | KEY           | VALUE                                                      |
  | ------------- | ---------------------------------------------------------- |
  | client_id     | kudosboards                                                |
  | client_secret | your client secret                                         |
  | redirect_uri  | https://(connections url)/boards/auth/connections/callback |
  | grant_type    | authorization_code                                         |
  | code          | (paste the code from the next step here)                   |

#### Open connections auth

  replace connections url in both places below

    https://(connections url)/oauth2/endpoint/connectionsProvider/authorize?client_id=kudosboards&redirect_uri=https%3A%2F%2F(connections url)%2Fapi-boards%2Fauth%2Fconnections%2Fcallback&response_type=code&state=1234

#### Click approve

The loaded page should error, that is expected.

#### Copy code from redirected url

#### Paste the code into postman and hit Send, you should get a response as below:

    {
      "access_token": "s67MkH8LYMMKiP0q2gtVKQxkD0gBcXJJlSCdvQw3",
      "token_type": "Bearer",
      "expires_in": 43199,
      "scope": "",
      "refresh_token": "EcO9hDYdU3tL2BE0xRSPNlYIGvZhYV9yezb14YKNglkFPwq4St"
    }

#### Use the token to request your profile

Open a new tab in postman and update:

  Method: GET

  Request URL: https://(connections url)/connections/opensocial/oauth/rest/people/@me/@self

  Authorization Tab

  TYPE: Bearer Token

  Token: (Paste in the access_token from the previous request)

Hit Send, You should get a json response describing your profile.


#### Reset WAS httpd.conf

Make sure to put the port numbers back to their original values.

