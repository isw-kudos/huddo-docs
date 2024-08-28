# Boards AIO - Subdomains

!!! tip

    This deployment type will deploy Huddo Boards on its own domain (e.g. https://boards.company.com).

!!! note

    This setup assumes that you will have 2 subdomains with a shared (wildcard) ssl certificate, both the certificate and key file for these domains need to be accessible to the server and the path filled in under the proxy section.

## Setup

### DNS

Configure your DNS to point the subdomains to the server running docker compose. For example, for testing you may set in the server's `/etc/hosts` file:

```
127.0.0.1 boards.company.com boards-api.company.com
```

### Directory structure

Create a directory for the database and file store

```bash
cd /data # or wherever you want to store the data
mkdir huddoboards
cd huddoboards
mkdir ./db ./files

# the mongo & s3 images run with user 1001, set permissions
chown -R 1001 ./db ./files
```

### Download Configuration

1.  Download the following files

    | Description         | File                                                                                                                                                                                                                                                   |
    | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
    | Configuration       | [config.zip](./config.zip)</br></br>This contains</br>- Environment variables (`.env`)</br>- Docker Compose file (`docker-compose.yml`)</br>- NGINX configuration template (`nginx.conf.template`)                                                     |
    | User authentication | Pick the file for your authentication provider:</br>- [HCL Connections](../auth/connections/user.env)</br>- [HCL Domino](../auth/domino/user.env)</br>- [HCL Digital Experience (DX)](../auth/dx/user.env)</br>- [Microsoft AD](../auth/msad/user.env) |

1.  Unzip the `config.zip` file to the `huddoboards` directory
1.  copy the `user.env` file to the `huddoboards` directory.

### Configure

#### .env

Update the following variables in the `.env` file:

| Variable            | Example                  | Description                                                     |
| ------------------- | ------------------------ | --------------------------------------------------------------- |
| `imageTag`          | `2024-08-07`             | [Date of our latest release](../../releases.md)                 |
| `appURI`            | `boards.company.com`     | URL of Boards UI                                                |
| `apiGateway`        | `boards-api.company.com` | URL of Boards API                                               |
| `smtpHost`          | `smtp.example.com`       | Email server                                                    |
| `smtpUsername`      | `user123`                | Email server username                                           |
| `smtpPassword`      | `passw0rd`               | Email server password                                           |
| `licence`           |                          | Licence key downloaded from [Huddo Store](../../store/index.md) |
| `databathPath`      | `./db`                   | Path for storage (e.g. fast, backed up etc)                     |
| `databasePassword`  | `dbpassword`             | MongoDB password - it will create the root user on first start  |
| `fileStorePath`     | `./files`                | Path for storage (e.g. large, backed up etc)                    |
| `fileStoreUsername` | `iou1username`           | File Store username - it will be created on first start         |
| `fileStorePassword` | `iou1password`           | File Store password - it will be created on first start         |

#### user.env

Set all of the variables in the `user.env` file. Each file contains different variables. For full details of the variables please see the [documentation](../../env/common.md#provider-specific-options).

## Deploy

Run the following command to deploy the application

```bash
cd huddoboards
docker compose up -d
```
