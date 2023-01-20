# Requirements and considerations before installation of Docker Swarm and Huddo Boards (DEPRECATED)
!!! warning
    These instructions are deprecated. Please see [standalone guide](/boards/standalone/) if you do not have either Kubernetes or Component Pack

## Servers

This solution is designed to be a lightweight, cloud-like setup running locally in your data centre. You should expect to configure a minimum of 4 very small servers, see [Swarm Installation](/swarm/#server-information) for a table showing the requirements.

---

## Existing Infrastructure

Huddo Boards for Docker Swarm is able to take advantage of existing services in your network, if you have any of the following and would like to take advantage of them, please ensure you have all relevant access documented.

| Service                   | Requirements                                                               |
| ------------------------- | -------------------------------------------------------------------------- |
| MongoDB                   | URL, username and password                                                 |
| S3 Storage                | URL, Bucket name, username and password                                    |
| NFS Server                | IP address or hostname, must be accessible to all swarm servers            |
| SNI Capable reverse proxy | admin access to proxy to configure all domains (see SSL Certificate below) |

---

## STMP for email notifications

If you would like to send emails, Huddo Boards docker requires details of a forwarding SMTP server in your environment (or other email provider sich as sendgrid)

---

## SSL Certificates / DNS

You will need to have certificates and DNS entries that cover the following domains:

> Replace `example.com` with your actual company domain

| Service    | Example domain         | DNS                                 |
| ---------- | ---------------------- | ----------------------------------- |
| Swarm      | swarm.example.com      | A record pointing to gateway server |
| Boards     | boards.example.com     | CNAME swarm.example.com             |
| Boards API | api-boards.example.com | CNAME swarm.example.com             |

---

## SSH Access

To perform the installation, you need to setup some config files on a local machine that has ssh access to the servers. You should ssh to each server manually before proceeding to ensure they are trusted.

---

## Authentication

Huddo Boards is designed to be integrated into your current user management system. Before you are able to login you will need to configure OAuth for one (or more) of the following providers (detailed instructions [here](/boards/swarm/#setup-oauth)):

| Provider                     | Registration / Documentation                                                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| IBM Connections (on premise) | [IBM Knowledge Center](https://www.ibm.com/support/knowledgecenter/en/SSYGQH_6.0.0/admin/admin/r_admin_common_oauth_manage_list.html) |
| IBM Connections Cloud        | [IBM Knowledge Center](https://www.ibm.com/support/knowledgecenter/en/SSL3JX/admin/bss/topics/manage_custom_apps.html)                |
| Microsoft Office 365         | [Azure app registrations](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade)                         |
| Google                       | [Google Console](https://console.developers.google.com/apis/credentials)                                                              |
| LinkedIn                     | [LinkedIn](https://www.linkedin.com/developers/apps)                                                                                  |
| Facebook                     | [Facebook developer centre](https://developers.facebook.com/apps/2087069981334024/fb-login/settings/)                                 |

---

## Dockerhub (Deprecated)

Access to the images for Boards is provided through [dockerhub](https://hub.docker.com). Please provide us with your username to grant access and have the credentials at hand for the install.

---

## Ansible

We use [Red Hat Ansible](https://www.ansible.com/) to script the installs. Please ensure this is installed as per [our guide](/tools/ansible/) prior to the swarm / boards install 
