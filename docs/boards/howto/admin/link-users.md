# Link User Accounts
**Note: admins only - on premise**

> This process allows you to link user accounts across multiple login methods by their email address. This gives the user the ability to login with either account, and more importanly collaborate with users in either system (ie Connections, Microsoft etc).

## Prerequisites
1. Profiles are synchronised

    In order to link accounts it is highly recommended to synchronise accounts to ensure they exist in the Boards database. Please follow [these instructions first](sync-profiles.md)

## Important Notes

- Please be aware that if you intend to remove login then the primary ID should be set as the ID for your intended login client (ie Microsoft), and the secondary that of the login method you to plan to remove (eg Connections). These IDs are visible in the URL of the admin page visited in the profile linking step.
- Accounts are matched on email address
- The process is run immediately on the next deployment of the `user` microservice
- Only run one replica to avoid conflicts, hence `replicaCount: 1`
- You can view the logs of the user service to see an output of changes 

      - users who were found in both clients
      - users who could not be matched by their email prefix
      - users who are already linked
      - users who have been linked as a result of the command

- The command is safe to run multiple times. The list of already linked should show the previous links, and there will be no new changes unless more users have been imported into the Boards DB.

## Process

1. Environment variables

    This process links users in 2 difference clients.  We utilise environment variables to initialise the process, e.g.

    ```yaml
    user:
      replicaCount: 1
      env:
        PROFILE_LINK_CLIENT_PRIMARY: 5ef2d52f6283afc12efd55a4
        PROFILE_LINK_CLIENT_SECONDARY: 5fd6974dd7c5ede08711432d
        # Determines if user accounts are linked on the email prefix (before the @ symbol), default is false
        # i.e. jsmith@huddo.com & jsmith@isw.net.au
        # PROFILE_LINK_EMAIL_PREFIX_ONLY: true
    ```

1. Redeploy the Helm chart

    For example:

        helm upgrade boards https://docs.huddo.com/assets/config/kubernetes/kudos-boards-5.2.0.tgz -i -f ./boards.yaml --namespace boards

1. Review the logs

    The logs should output in this format. Note the users who have been `updated`/`ignored`. On subsequent runs the people in `updated` will appear in `noChange` instead.

    ![Link Users logs](/assets/boards/admin/link-users-logs.png)

1. Remove Environment variables above and redeploy the Helm chart
