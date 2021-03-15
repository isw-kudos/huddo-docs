# Deactivate Login

## Process

1. Remove OAuth ClientID from user.env

    Comment out the CLIENT_ID for the provider to be deactivated:

        user:
          env:
            # CONNECTIONS_CLIENT_ID
            # MSGRAPH_CLIENT_ID

1. Redeploy the Helm chart

    For example:

        helm upgrade boards https://docs.kudosapps.com/assets/config/kubernetes/kudos-boards-4.0.0.tgz -i -f ./boards.yaml --namespace boards

1. Reload webpage

    The login option should be removed