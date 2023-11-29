# Boards Hybrid Security

Huddo Boards connects to your Connections servers over HTTPS via OAuth.

## IP Allow List

Our servers use a static outbound IP address. If your environment uses a firewall to access the Connections servers you will need to add the following IP to your allow-list

    34.91.118.129/32 	GCloud Prod EU Cluster NAT
    34.129.215.36/32 	GCloud Staging Cluster NAT

We communicate over HTTPS, so the port `443` must be allowed
