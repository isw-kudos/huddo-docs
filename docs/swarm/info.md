## Deploying Apps in Portainer

1. Create GCloud Servers

2. SSH to each server to trust IP

        ssh -i /home/awelch/.ssh/google_compute_engine 35.211.3.188

3. Update ansible hosts file with Node IPs

4. Setup servers with docker-swarm, Portainer & Traefik

        cd /devops/docker-swarm/ansible
        ansible-playbook -i hosts/gcloud.yml deploy.yml -v

5. Create admin user in Portainer

Open Dashboard as defined in `{{dashboard_host}}` e.g. `https://swarm.isw.net.au`

6. Add Dockerhub auth

    - Open Registries
    - Tick Authentication
    - add Username, Password

7. Deploy App Stacks (& optional logging stack)

    - Open Stacks
    - Add Stack
    - Give it a name
    - Add the yml
    - For all the details to deploy Huddo Boards [see here](/boards/swarm/)

8. Update DNS records with a cname entry pointing to `{{dashboard_host}}`

     For example:

         staging.kudosboards.com -> swarm.isw.net.au
         staging-api.kudosboards.com -> swarm.isw.net.au
         kibana-staging.kudosboards.com -> swarm.isw.net.au

9. Configure Kibana logs
    - login to kibana, ie `https://kibana-staging.kudosboards.com`
    - create index on `logstash*`
    - create search, open discover, select `docker.name` + `message` fields
    - save


## Troubleshooting
#### Recover from Cluster crash
Start new cluster

    docker swarm init --force-new-cluster --advertise-addr 10.142.0.12:2377

Check other Nodes automatically join new cluster

    docker node ls

If they don't, use the join command provided, ie:

    docker swarm join --token SWMTKN-1-1korweqob1x2530nc34uex84j03pa1e3x7qg5z2pt4bvt2fo5i-0aoijiczvso7socyzlrucbu8y 10.142.0.12:2377

List 'Down' nodes

    docker node ls

Remove 'Down' nodes

    docker node demote <node_id>
    docker node rm <node_id>

#### Recover from Service crash
- Run deploy stacks again
- Update each stack/service through Portainer

#### Rebalance containers on Nodes

    docker service update --force <stack>_<service>
ie:

    docker service update --force portainer_portainer proxy_proxy portainer_agent
