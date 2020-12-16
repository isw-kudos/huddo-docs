## Kubernetes install

This guide will install kubernetes latest (1.13 at time of writing) and calico network plugin. It is designed to be used alongside IBM Component Pack for connections but can be used standalone by adding an ingress.

---

## Server setup

This guide will install a minimal (Non HA) kubernetes environment that will run kudos boards for up to 1000 users, it will also run IBM Component Pack for connections but is the absolute minimum required for this, please see [IBM Documentation for Kubernetes](https://www.ibm.com/support/knowledgecenter/en/SSYGQH_6.0.0/admin/install/cp_prereqs.html) for more information on installing and running Component Pack.

We will need the following servers setup:

| Role           | OS         | CPU        | Memory | Disks                                      |
| -------------- | ---------- | ---------- | ------ | ------------------------------------------ |
| Manager        | Centos 7.6 | 4 @ 2.xGHZ | 16GB   | primary: 50GB min<br> secondary: 100GB min |
| Workers (\* 2) | Centos 7.6 | 8 @ 2.xGHZ | 24 GB  | primary: 50GB min<br> secondary: 100GB min |

---

### Prerequisites

1. ssh access to all servers (please connect and confirm ssh signature for each)
1. Huddo [Ansible Roles](/assets/ansible.zip) downloaded and extracted
1. Ansible setup, see [setting up ansible](/tools/ansible/)
1. Servers have internet access

---

## Configuring ansible inventory

Open `ansible/hosts/kubernetes.yml` and update the following:

| Variable                   | Description                                                                                                     |
| -------------------------- | --------------------------------------------------------------------------------------------------------------- |
| vars.ansible_user          | Username for ssh access                                                                                         |
| vars.ansible_password      | Password for ssh access                                                                                         |
| vars.docker_device         | secondary drive as defined above<br>run `lsblk` on each server to confirm<br>__warning__: this device will be wiped |
| hosts.manager.ansible_host | IP Address of the manager                                                                                       |
| hosts.worker1.ansible_host | IP Address of worker 1                                                                                          |
| hosts.worker2.ansible_host | IP Address of worker 2                                                                                          |

---

## Initialise Docker and thinpool on the servers

> ensure the docker_device defined above is correct on all servers before running this first step!

    cd /path/to/ansible/
    ansible-playbook -i hosts/kubernetes.yml kubernetes.yml -v --tags "init"

---

## Disable swap on all servers

> This step must be run manually on all servers.

ssh to each server and run the following:

    swapoff -a

Edit /etc/fstab and comment out the following statement to ensure that swap is not enabled after an operating system restart:

    # /dev/mapper/system-swap swap swap defaults 0 0

If the statement does not appear in the file, continue to the next step.
If you made any changes to the /etc/fstab file, run the following command to apply the change:

    mount -a

---

## Setup kubeadm, kubectl, kubelet and helm

    ansible-playbook -i hosts/kubernetes.yml kubernetes.yml -v --tags "kube"

---

## IBM Component Pack

You are now ready to install IBM Component Pack, please use the [IBM Documentation](https://www.ibm.com/support/knowledgecenter/en/SSYGQH_6.0.0/admin/install/cp_install_upgrade_intro.html)

---

## Manual Ingress install

> This step is only needed if you are not installing IBM Component Pack

Login to the manager to run these commands:

    kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/mandatory.yaml
    kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/provider/baremetal/service-nodeport.yaml
    kubectl -n ingress-nginx describe svc ingress-nginx

Kubernetes will assign a port for your http and https traffic ( Listed in the output of the last command above ), these ports should be used in you proxy config in place of the standard connections ports (32080 and 32443).

---

## Install Huddo Boards

Please see [Huddo Boards for Kubernetes](/boards/kubernetes/).
