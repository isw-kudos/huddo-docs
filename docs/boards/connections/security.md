# Boards Hybrid Security

Huddo Boards connects to your Connections servers over HTTPS via OAuth.

## IP Whitelisting

Our servers use a static outbound IP address. If your environment uses a firewall to access the Connections servers you will need to add the following IP to your allow-list

    34.90.133.147

We communicate over HTTPS, so the port `443` must be allowed
