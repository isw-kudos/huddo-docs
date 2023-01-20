Requirements and considerations before installation of Kubernetes and Huddo Boards

## Servers

This solution is designed to run a cloud-like environment locally in your data centre. You should expect to configure a minimum of 3 servers.

This solution is ideal if you already have kubernetes (or IBM Component Pack for connections) as it can run in your existing environment. If this is the case, please reach out to Team Huddo for support.

---

## Existing Infrastructure

In addition to the above, Huddo Boards for Kubernetes is able to take advantage of existing services in your network, if you have any of the following and would like to take advantage of them, please ensure you have all relevant access documented.

| Service    | Requirements                                                    |
| ---------- | --------------------------------------------------------------- |
| MongoDB    | URL, username and password                                      |
| S3 Storage | URL, Bucket name, username and password                         |
| NFS Server | IP address or hostname, must be accessible to all swarm servers |

---

## STMP for email notifications

If you would like to send emails, Huddo Boards docker requires details of a forwarding SMTP server in your environment (or other email provider sich as sendgrid)

---

## SSL Certificates and domain names for hosting

> In the examples below, replace `example.com` with your actual company domain

Huddo Boards requires 2 domains (or redirects) in your network, one for the web application and one for the api. You can use a new domain or subdomain for this or you can use a path on an existing service.

For example:

|     | Domain                 | Path                   |
| --- | ---------------------- | ---------------------- |
| Web | boards.example.com     | example.com/boards     |
| API | api-boards.example.com | example.com/api-boards |

> We'll refer to these throughout installation as [BOARDS_URL] and [API_URL]

You will need a reverse proxy in place to forward network requests to the kubernetes master. This proxy should be able to resolve certificates that cover all domains used.

---

## SSH Access

To perform the installation, you need to setup some config files on a local machine that has ssh access to the servers. You should ssh to each server manually before proceeding to ensure they are trusted.

---

## Authentication

Huddo Boards is designed to be integrated into your current user management system. Before you are able to login you will need to configure OAuth for one (or more) of the following providers (detailed instructions [here](/boards/swarm/#setup-oauth)):

| Provider                     | Registration / Documentation                                                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| HCL Connections (on premise) | [IBM Knowledge Center](https://www.ibm.com/support/knowledgecenter/en/SSYGQH_6.0.0/admin/admin/r_admin_common_oauth_manage_list.html) |
| IBM Connections Cloud        | [IBM Knowledge Center](https://www.ibm.com/support/knowledgecenter/en/SSL3JX/admin/bss/topics/manage_custom_apps.html)                |
| Microsoft Office 365         | [Azure app registrations](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade)                         |
| Google                       | [Google Console](https://console.developers.google.com/apis/credentials)                                                              |
| LinkedIn                     | [LinkedIn](https://www.linkedin.com/developers/apps)                                                                                  |
| Facebook                     | [Facebook developer centre](https://developers.facebook.com/apps/2087069981334024/fb-login/settings/)                                 |

---

## Access to Docker Images

[Follow this guide](/boards/images/) to get access to our images

---

## Ansible

We use [Red Hat Ansible](https://www.ansible.com/) to script the installs. Please ensure this is installed as per [our guide](/tools/ansible/) prior to the kubernetes / boards install
