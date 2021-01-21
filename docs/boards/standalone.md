### Boards standalone deployment

This document outlines a standalone (all in one) deployment of Huddo Boards. This can be used as a proof of concept, staging deployment or even a production deployment for a limited number of users (e.g. &lt; 500).

You may run all services including database and file storage on one server, or you can use an external mongo database or s3 file store.

This setup does not include a proxy server, although there is no reason you could not also run a proxy on the same server.

#### Server requirements

RHEL (or Centos 7) server with:

- 8gb ram minimum
- 4 vCPUs
- 40gb system drive
- 100gb data drive (will be shared for database and file store)
- docker and docker-compose

Please contact support@huddo.com for assistance, providing your Docker Hub ID so that we may give you access to our repositories and templates.
