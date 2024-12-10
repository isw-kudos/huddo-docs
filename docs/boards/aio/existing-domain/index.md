# Boards AIO - Existing domain

!!! tip

    This deployment type will deploy Huddo Boards at a context root under an existing domain (e.g. https://company.example.com/boards).

## Setup

### Proxy

Follow the steps in the [Proxy Configuration](./proxy.md) to configure your NGINX or HTTPD proxy.

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
    | Configuration       | [config.zip](./config.zip)</br></br>This contains</br>- Environment variables (`.env`)</br>- Docker Compose file (`docker-compose.yml`)</br>- NGINX configuration (`nginx.conf`)                                                                       |
    | User authentication | Pick the file for your authentication provider:</br>- [HCL Connections](../auth/connections/user.env)</br>- [HCL Domino](../auth/domino/user.env)</br>- [HCL Digital Experience (DX)](../auth/dx/user.env)</br>- [Microsoft AD](../auth/msad/user.env) |

1.  Unzip the `config.zip` file to the `huddoboards` directory
1.  copy the `user.env` file to the `huddoboards` directory.

### Configure

#### .env

Update the following variables in the `.env` file:

| Variable            | Example               | Description                                                     |
| ------------------- | --------------------- | --------------------------------------------------------------- |
| `imageTag`          | `2024-12-10`          | [Date of our latest release](../../releases.md)                 |
| `domain`            | `company.example.com` | URL of your environment                                         |
| `smtpHost`          | `smtp.example.com`    | Email server                                                    |
| `smtpUsername`      | `user123`             | Email server username                                           |
| `smtpPassword`      | `passw0rd`            | Email server password                                           |
| `licence`           |                       | Licence key downloaded from [Huddo Store](../../store/index.md) |
| `databasePath`      | `./db`                | Path for storage (e.g. fast, backed up etc)                     |
| `databasePassword`  | `dbpassword`          | MongoDB password - it will the root user on first start         |
| `fileStorePath`     | `./files`             | Path for storage (e.g. large, backed up etc)                    |
| `fileStoreUsername` | `iou1username`        | File Store username - it will be created on first start         |
| `fileStorePassword` | `iou1password`        | File Store password - it will be created on first start         |

!!! info

    See the [minios documentation](https://docs.min.io/minio/baremetal/reference/minio-server/minio-server.html#root-credentials) for more information on the fileStore credentials, and an example of the values [used here](https://docs.min.io/docs/minio-docker-quickstart-guide.html). The standard seems to be around 20 characters all caps/numbers for the username and around 40 characters any case / number for the password.

#### user.env

Set all of the variables in the `user.env` file. Each file contains different variables. For full details of the variables please see the [documentation](../../env/common.md#provider-specific-options).

## Deploy

Run the following command to deploy the application

```bash
cd huddoboards
docker compose up -d
```
