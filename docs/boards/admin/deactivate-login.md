# Deactivate Login

## Process

1. Remove OAuth ClientID from user.env

    Comment out the CLIENT_ID for the provider to be deactivated:

    ```yaml
    user:
      env:
        # CONNECTIONS_CLIENT_ID
        # MSGRAPH_CLIENT_ID
    ```

1. Redeploy the Helm chart using your [helm upgrade command](../helm-charts.md#huddo-boards)

1. Reload webpage

    The login option should be removed