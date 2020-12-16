# Docker Swarm

## Overview / Introduction

This document will step through setting up a functional docker swarm environment that includes:

- Shared storage with nfs
- http(s) proxy _traefik_
- Management interface _portainer_
- Database _mongo_ (optional)
- S3 Object storage _minio_ (optional)
- Logging _elk stack_ - (optional)
- Monitoring _prometheus/grafana_ - (optional)

---

## Server information

As the name swarm suggests, this setup is designed to run across a number of servers (referred to as nodes). ISW recommends that the minimum number of servers you should start with is 4, being one for the NFS server and http gateway and 3 swarm managers. You may start with small VMs to set this up and expand them as your need increases (either by extending cores and ram on the existing servers or by adding more manager/worker nodes to your swarm).

This document will assume the following setup:

- Gateway server (CentOS)
- 3 Swarm managers (CoreOS)

If you have more managers or workers just extend the config where indicated below.

If you are testing this setup, you can get away with quite small servers (we have had success with 2 cores and 1.7gb ram) however if you plan to include the logging and/or monitoring services then you should expect to dedicate an additional 1gb ram minimum for each of these sevices.

The Gateway Server will be used for storing all persistent data in nfs shares, if you are setting this environment up for a production system then you should ensure that you have a suitably performant disk for the path `/data` on this server, you should also ensure that this folder is backed up appropriately.

|                    | Test | Small (&lt;1000 users) | Large (&gt;1000 users) |
| ------------------ | ---- | ----------------------- | ---------------------- |
| **Gateway**        | 1    | 1                       | 1                      |
| **Managers**       | 3    | 3                       | 3                      |
| **Workers**        | 0    | 0                       | 1 per extra 5000 users |
| **Memory**         | 2GB  | 4GB                     | 8GB                    |
| **CPU**            | 2    | 2                       | 4                      |
| **Disk (Nodes)**   | 20GB | 40GB                    | 100GB min              |
| **Disk (Gateway)** | 40GB | 200GB                   | 1000GB min             |

---

## Network setup

The setup below will establish some internal networking rules to help protect your environment.  
When configuring the servers, you will need to enable the following network rules:

- http(s) traffic should be allowed to the Gateway only
- ssh traffic should be allowed to all servers
- Where possible all servers should be on an additional (internal only) subnet, this allows us to further lock down access to NFS shares
- If you have access to the servers from your local machine then you can run the scripts directly, however if this is not the case then you will need to use an ssh jump box as depicted below.

![Network Diagram](/assets/swarm-net.png)

---

## Setup Ansible

See [Ansible setup guide](/tools/ansible/).

Download and extract [This zip file](/assets/docker-swarm-blank.zip) to a convenient location, you will run the ansible scripts below from this directory.

---

## SSL setup

There are four domains in this guide that will require certificates, these can be covered by a single wildcard certificate or by individual certificates.

- boards.example.com
- boards-api.example.com
- portainer.example.com
- proxy.swarm.example.com (optional traefik proxy dashboard)

You will need to obtain pem encoded certificates (including any required intermediate certificates) and keys for these domains. These should be named alike (e.g. boards.crt and boards.key).

Place all the certificates and keys in the directory `ansible/roles/docker-swarm/files/ssl/`.

---

## Server access

Ansible uses ssh to communicate with the servers so you'll need to be able to access them from your shell directly.

The ideal way to achieve this is to setup key based authentication, however there are workarounds that can be done if you have to use password based authentication.

For more info on setting up an ssh private key, see [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2)

As mentioned in the linked article, we will need to add each of our servers to our local list of known hosts, this is done by manually connecting to each of them for our shell.

    ssh -i path/to/keyfile <username>@<server_ip>
    e.g. ssh -i /home/nicky/.ssh/id_rsa nicky@10.10.10.1

---

## Config

Download [this hosts file](/assets/config/swarm/servers.yml), save it in the hosts directory and update the values as follows:

| Key                                   | Description                                                                                                                                                                                                                      |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| all.hosts.gateway.ansible_host        | IP For Gateway server accessible from your machine                                                                                                                                                                               |
| all.hosts.nfs_server.ansible_host     | IP For Gateway server accessible from your machine                                                                                                                                                                               |
| all.hosts.nfs_server.internal_ip      | internal IP For Gateway server, if you do not have an internal subnet, use the same IP as above                                                                                                                                  |
| all.hosts.manager(1,2,3).ansible_host | IP For Manager node accessible from your machine                                                                                                                                                                                 |
| all.hosts.manager(1,2,3).internal_ip  | internal IP For Manager node, if you do not have an internal subnet, use the same IP as above                                                                                                                                    |
| all.vars.ansible_user                 | Your username on all servers                                                                                                                                                                                                     |
| all.vars.ansible_ssh_private_key_file | Full path to your keyfile (leave blank if using password auth)                                                                                                                                                                   |
| all.vars.swarm_ip_mask                | ip mask that matches your internal subnet e.g. 10.10.10.10/24, or that matches all swarm nodes if you do not have an internal subnet                                                                                             |
| all.vars.ssl_certs                    | The names of all SSL certificates as defined above |
| all.vars.dashboard_host               | The domain name for your portainer dashboard                                                                                                                                                                                     |
| all.vars.proxy_dashboard_host         | The domain name for your traefik proxy dashboard                                                                                                                                                                                 |
| all.vars.monitoring                   | This section will be covered in Advanced below, you should get the swarm up and running first before adding monitoring                                                                                                           |
| all.children                          | This section of the config file is for defining where your nodes will sit, please follow the instructions provided in the file itself, adding all nodes to the coreos group, and managers and workers to their respective groups |

---

## Deploy

1.  Save your config file in the hosts directory
1.  run the deploy playbook:

        ansible-playbook -i hosts/servers.yml deploy.yml -v

---

## Update DNS records

Ensure that DNS records for your portainer dashbaord and traefik dashboard as defined in your config file are pointing to your Gateway server

---

## Portainer Setup

1.  Open Dashboard as defined in `{{dashboard_host}}` above

1.  Create admin user when prompted

1.  Add Dockerhub auth

    - Open Registries
    - Tick Authentication
    - add Username, Password

---

## Storage (Mongo & S3)
Huddo Boards requires a Mongo database and an S3 object store.  If you do not already have your own externally hosted services for this, please follow [this documentation](/swarm/storage/) to deploy MongoDB and Minio (S3) containers into your Swarm setup.

---


## Run Huddo Boards (and other apps) with Portainer

See [Huddo Boards for Docker Swarm](/boards/swarm/) for a step by step guide to running Huddo Boards on your new environment.
