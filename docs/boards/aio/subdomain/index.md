# Subdomain

This setup assumes that you will have 2 subdomains with a shared (wildcard) ssl certificate, both the certificate and key file for these domains need to be accessible to the server and the path filled in under the proxy section. you may use separate certificates if needed by mounting them both in the proxy service with appropriate naming and using the new mounted files in the [nginx.conf](./nginx.conf) file.

## Setup

1. Configure your DNS to point the subdomains to the server running docker compose.
