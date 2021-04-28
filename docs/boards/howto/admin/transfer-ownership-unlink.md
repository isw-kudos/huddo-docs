# Transfer Ownership & Unlink User Accounts
**Note: admins only - on premise**

In the user interface a user can unlink an account alias and transferring content ownership to their primary. This process is designed to perform the same action in bulk for all users which belong to specific clients (login methods) who have linked accounts. 

## Important Notes

  - Please be aware that the `to` client target ID below should be set as the ID for your intended login method (ie Microsoft), and the `from` that of the login method being removed (ie Connections). These IDs are visible in the URL of the admin page.
  - The process is run immediately on the next deployment of the boards app.
  - Only run one replica to avoid conflicts, hence `replicaCount: 1`
  - You can view the logs of the `boards-app` microservice to see an output of changes to source/target groups
  - The command is safe to run multiple times. There will be no new changes unless more user accounts have been linked.


## Process
1. Environment variables

    Set the following environment variables

    ```yaml
    boards:
      replicaCount: 1
      env:
        TRANSFER_AND_UNLINK_TO_CLIENT: 5fd6974dd7c5ede08711432d
        TRANSFER_AND_UNLINK_FROM_CLIENT: 5ef2d52f6283afc12efd55a4
    ```

1. Redeploy the Helm chart

    For example:

        helm upgrade boards https://docs.huddo.com/assets/config/kubernetes/kudos-boards-5.0.0.tgz -i -f ./boards.yaml --namespace boards

1. Review the logs

    The logs should output information in this format. Note each transfer of content ownership `from` => `to` and the number of associated nodes/members/invites that were updated, before the alias is unlinked from the primary.

    ![Transfer ownership unlink logs](/assets/boards/admin/transfer-ownership-unlink-logs.png)

1. Remove Environment variables above and redeploy the Helm chart
