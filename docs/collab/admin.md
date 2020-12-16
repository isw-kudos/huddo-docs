# three thirds collaboration admin app

## Installation

1.  Prerequisites: docker, docker-compose, git.

1.  Installation requires a deployment key in the msp-admin project managed by Huddo Team, you can run `ssh git@github.com` to check if you are authenticated.

1.  clone the project

        git clone git@github.com:iswkudos/msp-admin.git

## Environment Variables

1. copy the .env.default file to .env and update it's values as below.

| Name                   | Description                                                   | Example                       |
| ---------------------- | ------------------------------------------------------------- | ----------------------------- |
| APP_URI                | Web facing url                                                | admin.testna.collab.cloud     |
| KEYCLOAK_HOST          | Keycloak login                                                | login.testna.collab.cloud     |
| KEYCLOAK_CLIENT_ID     | Keycloak client                                               |                               |
| KEYCLOAK_REALM         | Keycloak realm                                                |                               |
| KEYCLOAK_CLIENT_SECRET | Keycloak secret                                               |                               |
| KEYCLOAK_ADMIN_USER    | Keycloak user with access to admin-cli client in master realm |                               |
| KEYCLOAK_ADMIN_PASS    | And his password                                              |                               |
| REDIS_CACHE_HOST       | Redis server                                                  |                               |
| REDIS_CACHE_PORT       | Redis port                                                    |                               |
| LDAP_USER              | LDAP admin user                                               |                               |
| LDAP_PASSWORD          | And his password                                              |                               |
| LDAP_URL               | LDAP Server                                                   |                               |
| API_URI                | Api url                                                       | admin-api.testna.collab.cloud |

## Run / Build / Update

1. This project runs the following services in docker using compose:
        - redis: local cache
        - ldap: handles all ldap queries
        - core: api gateway, makes calls to keycloak and connections apis
        - webfront: serves static javascript (react) application files

        You can check the logs of any of these with `docker-compose logs [service-name]`

1. To update, build and run all of these services, run `devops/update.sh`
