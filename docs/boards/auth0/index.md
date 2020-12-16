This integration enables you to _manage users in Auth0_ for login to Huddo Boards. Auth0 will maintain a directory of your users for Huddo Boards. This enables standalone use of Huddo Boards if you do not have any of the other supported authentication providers in your business.

You may switch to using one of our other supported authentication providers at a later stage should you wish.

### Setting up a new Auth0 tenant for use with Huddo Boards

- Sign up at [Auth0](https://auth0.com/) by providing your email and a suitable password.

![Sign Up](/assets/auth0/signup.png)

- Choose a tenant domain and region

![Tenant Selection](/assets/auth0/choose-tenant.png)

- Fill in your company details

![Company Details](/assets/auth0/account.png)

- Create a new application, providing `Huddo Boards` for the name and choose `Regular Web Applications` as the type.

![Application Wizard 1](/assets/auth0/huddo-create-application.png)

- Open your application and go to the settings tab.

![Application Wizard 2](/assets/auth0/huddo-application.png)

- Provide the rest of the details as below:

  > In the table below, copy your auth0 domain (listed at the top of the page) into the relevant fields, replacing &lt;domain&gt; with 'your-domain.au.auth0.com' where applicable

  | Field                                | Value                                                       |
  | ------------------------------------ | ----------------------------------------------------------- |
  | Application Logo                     | https://boards.huddo.com/img/logo-small.png                 |
  | Token Endpoint Authentication Method | Post                                                        |
  | Allowed Callback URLs                | https://boards.huddo.com/auth/auth0/&lt;domain&gt;/callback |
  | Allowed Web Origins                  | https://boards.huddo.com                                    |
  | Allowed Origins (CORS)               | https://\*.huddo.com                                        |

- Click Show Advanced Settings -> Grant Types and tick `Implicit`, `Authorization Code`, `Refresh Token` and `Client Credentials`
- Click Save Changes
- Send An email to [support@huddo.com](mailto:support@huddo.com?subject=Huddo Boards Auth0 activation) with your domain, Client ID and Client Secret.

---

### Enable user searching

In order to allow your users to find each other, we need to enable one of Auth0's api features.

- Click `APIs` and next to the Auth0 Management API Click the settings button.

![Auth0](/assets/auth0/apis.png)

- Click `Machine to Machine Applications` and next to Huddo Boards click the `AUTHORIZED` slider so it is enabled as below.

![Auth0](/assets/auth0/huddo-m2m.png)

- The Scopes should automatically open as below, if they do not click the `>` next to the slider above
- Find and tick the `read:users` scope then click `UPDATE`

![Auth0](/assets/auth0/api-scopes.png)

---

### Adding Users to your Auth0 tenant

- Login or Sign up to [Auth0](https://auth0.com/)
- Click Users under Users and Roles
- Click `Create New User` and provide the email and password for the user you wish to add. Leave the Connection as Username-Password-Authentication

![Create User](/assets/auth0/create-user.png)

> If you aren't redirected to the users page, click them to open it

- Click `Edit` under the users name

![Edit User](/assets/auth0/edit-name.png)

- Update the users full name and click `Save`

![Save User](/assets/auth0/save-name.png)

### Sign in to Huddo Boards with your Auth0 Tenant

Once your Auth0 tenant has been activated you will get an email from our support team with confirmation, you may then go to [Huddo Boards](https://boards.huddo.com) and use your Auth0 domain as the team name to login.

![Huddo Boards Login](/assets/auth0/boards-login.png)

After submitting your Team Name, you'll be asked for the email address and password associated with your Auth0 user account, to finalise your login.

---

![Company Details](/assets/auth0/huddo-login.png)
