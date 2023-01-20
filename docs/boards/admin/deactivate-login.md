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

1. Redeploy the Helm chart

    For example:

        helm upgrade huddo-boards https://docs.huddo.com/assets/config/kubernetes/huddo-boards-1.0.0.tgz -i -f ./boards.yaml --namespace boards

1. Reload webpage

    The login option should be removed