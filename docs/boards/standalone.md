# Boards Standalone Deployment

This document outlines a standalone (all in one) deployment of Huddo Boards. This can be used as a proof of concept, staging deployment or even a production deployment for a limited number of users (e.g. &lt; 500).

You may run all services including database and file storage on one server, or you can use an external mongo database or s3 file store.

Like all other deployments of Huddo Boards, this requires configuration of 2 domains: Application and API. e.g. boards.huddo.com and boards.api.huddo.com

## Server requirements

RHEL (or Centos 7) server with:

- 8gb ram minimum
- 4 vCPUs
- 40gb system drive
- 100gb data drive (will be shared for database and file store) <sup>*see Persistence Options below</sup>
- docker and docker-compose

Please [follow this guide](/boards/images/) to get access to our images in Quay.io so that we may give you access to our repositories and templates.

## Options

### Network

You may use an external proxy or send traffic directly to the server. If you are sending traffic directly to the server, you will need pem encoded certificate (with full chain) and key.

### Persistence

Boards uses 3 types of persistent data: mongodb, s3 file store and redis cache.

Each of these may use external services or the included services in the template (this hugely changes the server demand).

If using the included services, you will need to map directories for mongo and s3 containers to the data drive above, this data drive should be backed up however you currently backup data

### Environment Variables

Most required variables are in the template, for more information see the Kubernetes docs 

 - [Global config](/boards/kubernetes/#update-config-file)
 - [Boards variables](/boards/env/common/)
