# Huddo Boards On-Premise in Microsoft Teams

<div style="text-align:center" markdown>

  [![Your tasks, your team, your way](./store-slides/1%20EN%20UK.png){ style="width:30%" }](./store-slides/1%20EN%20UK.png)
  [![Intuitive task management](./store-slides/2%20EN%20UK.png){ style="width:30%" }](./store-slides/2%20EN%20UK.png)
  [![Go into detail](./store-slides/3%20EN%20UK.png){ style="width:30%" }](./store-slides/3%20EN%20UK.png)
  [![Huddo Boards where you work](./store-slides/4%20EN%20UK.png){ style="width:30%" }](./store-slides/4%20EN%20UK.png)
  [![Teams activity feed](./store-slides/5%20EN%20UK.png){ style="width:30%" }](./store-slides/5%20EN%20UK.png)

</div>

## Contact Us
Send an email to [support@huddo.com](mailto:support@huddo.com) with the following details:


> Hi! I'd like to set up the Huddo Boards teams app for my company, [COMPANY NAME]. Here are the details:
>
> - *(optional)* Attach the `.zip` or `manifest.json` file of any previous Huddo Boards teams app you have used or been provided before. 
> - [  ] The Application ID of the Huddo Boards application you have registered in Microsoft Entra
> - [  ] `APP_URI` value from your helm chart values.
> - [  ] `API_GATEWAY` value from your helm chart values.

We will generate your customized Huddo Boards Teams app and provide you up-to-date guidance on how to deploy it in your environment.

Note that updates to the Huddo Boards Teams app may need to be re-deployed via another customised Teams app package. Providing you with Teams app updates is currently a manual process. 
 
---
Once you have your customised Teams app and advice from the Huddo team:

1.  Open the Boards Helm Chart config used for deployment

    Add the following environment variable to `provider` (uncomment or add the section as required):

    ```yaml
    provider:
        env:
            MSGRAPH_TEAMS_MANIFEST_ID: "<id attribute from your teams app manifest.json>"
    ```

2.  Redeploy Boards helm chart as per command for Huddo Boards:

    [HCL Component Pack](../../cp/index.md#deploy-boards-helm-chart)

        helm upgrade huddo-boards-cp https://docs.huddo.com/assets/config/kubernetes/huddo-boards-cp-1.2.0.tgz -i -f ./boards-cp.yaml --namespace connections

    [for Docker - Kubernetes](../../kubernetes/index.md#deploy-boards-chart)

        helm upgrade huddo-boards https://docs.huddo.com/assets/config/kubernetes/huddo-boards-1.0.0.tgz -i -f ./boards.yaml --namespace boards

    > **Note:** `--recreate-pods` is not required this time as this is only an env variable change

---

## How To Use

For a full guide on using Huddo Boards in Microsoft Teams, please see [our documentation](index.md).
