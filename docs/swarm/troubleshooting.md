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
