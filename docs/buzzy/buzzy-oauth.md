# IBM Connections OAuth Setup

### Register OAuth

  In order for Buzzy to authenticate with your Connections environment, you must define a new OAuth widget.

  ---

  1. SSH to the IBM Connections Deployment Manager (substitute the alias)

          ssh root@[DEPLOY_MANAGER_ALIAS]

  1. Start `wsadmin` (substiture your credentials)

          cd /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/bin/
          ./wsadmin.sh -lang jython -username connectionsadmin -password passw0rd

  1. Register the new application definition

          execfile('oauthAdmin.py')
          OAuthApplicationRegistrationService.addApplication('buzzy', 'buzzy', 'https://<BUZZY_URL>/pre-oauth-connections/buzzy')

      Where `[BUZZY_URL]` is the URL of the Buzzy installation specified previously


  1. To view the uniquely created client clientSecret

          OAuthApplicationRegistrationService.getApplicationById('buzzy')


      These commands will print the definition. Please take note of the `clientSecret`.  We will use this later on.
