# Buzzy Installation Guide for Connections On-Premise 6.0 and above
Basic instructions for deploying buzzy into Kubernetes -or- IBM Cloud Private for on-premise IBM Connections environments

### Prerequisites
1. Kubernetes -or- IBM Cloud Private is installed and running
1. WebSphere environment with Web Server
1. [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) is installed
1. SMTP gateway setup for email notifications
1. [Buzzy Config file](/assets/config/buzzy.yml) downloaded
1. [Logging Config file](/assets/config/buzzy-logging.yml) downloaded
1. Dockerhub account setup with access to Buzzy repository


### Configure kubectl

**Kubernetes**

- copy \$HOME/kube/.config from the primary server to the same location locally (backup any existing local config)

**IBM Cloud Private**

- Open ICP Console
- Go to `Admin` (top right)
- Click `Config Client`
- Copy the contents shown
- Open your command line / terminal
- Paste the commands copied earlier and press enter


### Setup Buzzy namespace
    kubectl create namespace buzzy

### Setup secrets
1.  Dockerhub credentials

        kubectl create secret docker-registry dockerhub --docker-server=docker.io --docker-username=<username> --docker-password=<password> --docker-email=<email> --namespace=buzzy

### Setup OAuth

Please follow [these instructions](/buzzy/buzzy-oauth/)

### Setup Storage

Buzzy requires a Mongo database and an externally accessible AWS S3 compatible file storage. If you already have equivalent services that can be accessed from within the `buzzy` namespace in kubernetes (either externally accessible or a cross-namespace service in Kubernetes) then you can use your existing details in the config below, otherwise you may follow our instructions to deploy one or both of these services as follows:

1. [Mongo database](/buzzy/mongo)
1. [S3 storage](/buzzy/minio)

**Note:** these tasks are very similar to each other and can be performed simultaneously

### Deploy Buzzy

NOTE: If using self-signed certificates you will need to uncomment NODE_TLS_REJECT_UNAUTHORIZED at lines 38 & 39

1. Edit [buzzy.yml](/assets/config/buzzy.yml) and enter details at the following lines:	 

| Key | Description |
| --- | ----------- |
| ROOT_URL | URL you are deploying Buzzy to, including https://  |
| MONGO_URL | Enter your mongoDB credentials and URL   |
| MONGO_OPLOG_URL | Enter your mongoDB credentials and URL   |
| METEOR_SETTINGS.AWS_BUZZY_FILES | Your s3 file storage config  |
| METEOR_SETTINGS.MAIL_URL | Enter your SMTP details (same as above) |
| METEOR_SETTINGS.BUZZY_ADMIN_EMAIL | OPTIONAL: Enter Admin user email, used as the primary owner of the default buzzes and resources that appear on the palette |
| METEOR_SETTINGS.DEFAULT_OAUTH_PROVIDERS | Details for the OAuth provider to be set up (e.g. IBM Connections). ClientID and ClientSecret are from the OAuth setup in the previous step |
| METEOR_SETTINGS.BUZZY_LOGGING_TOKEN | Token used for access to the Buzzy logging server. Must be the same in the buzzy-logging.yml |
| METEOR_SETTINGS.BUZZY_CREATE_DEFAULT_ACCOUNTS  | Default accounts created. Set isAdmin for these accounts to be considered the same as BUZZY_ADMIN_EMAIL. Make the email the same as one from the OAuth provider to be able to view and edit the provider settings |
| METEOR_SETTINGS.public.AWS_BUZZY_FILES | public AWS details for files |
| METEOR_SETTINGS.public.IBMConnectionsOnPrem.signInDomains | IBM Connections URLs you are connecting to this Buzzy instance |
| METEOR_SETTINGS.public.IBMConnectionsOnPrem.defaultClientID | The same as the provider `name` in DEFAULT_OAUTH_PROVIDERS.providers.name above |
| METEOR_SETTINGS.public.IBMConnectionsCloud.defaultClientID | The same as the provider `name` in DEFAULT_OAUTH_PROVIDERS.providers.name above |
| METEOR_SETTINGS.public.IBMConnectionsCloud.defaultSignInDomain | IBM Connections URLs you are connecting to this Buzzy instance |
| METEOR_SETTINGS.public.BUZZY_CUSTOM.NAME | Company Name |
| METEOR_SETTINGS.public.BUZZY_CUSTOM.LOGO_MAIN | URL of your main logo |
| METEOR_SETTINGS.public.BUZZY_CUSTOM.LOGO_MAIL | URL of us in Email |
| METEOR_SETTINGS.public.BUZZY_CUSTOM.EMAIL_FOOTER | Email Footer |
| METEOR_SETTINGS.public.BUZZY_CUSTOM.PROMO_URL | Splash image |
| METEOR_SETTINGS.public.BUZZY_CUSTOM.WELCOME_IMAGE | Welcome Image |
| METEOR_SETTINGS.public.BUZZY_LOGGING_SERVER | URL of the Buzzy logging server |
| Ingress.spec.rules.host | host name for the buzzy app |

1. Create your services   
`kubectl apply -f buzzy.yml`   
service has NodePort (ie 30289 which maps to 30buz on keypads)   
accessible on `<server-ip>:30289`
1. Add new DNS record for Buzzy URL   
ie `buzzy.net.au`

1. Login to Buzzy with the account set up in BUZZY_CREATE_DEFAULT_ACCOUNTS above and confirm the org and provider details are correct

1. Restart the Buzzy Application

### Deploy Buzzy Logging
Buzzy logging server is required for Analytics inside the Buzzy app.
NOTE: Buzzy logging server srequires Websocket support and as such it will not work if you are using IHS as the gateway to your Kubernetes environment.

1. Edit [buzzy-logging.yml](/assets/config/buzzy-logging.yml) and enter details at the following lines:	 

| Key | Description |
| --- | ----------- |
| ROOT_URL | URL you are deploying Buzzy logging to, including https://  |
| MONGO_URL | Enter your mongoDB credentials and URL  |
| MONGO_OPLOG_URL | Enter your mongoDB credentials and URL   |
| METEOR_SETTINGS.BUZZY_LOGGING_TOKEN | Token used for access to the Buzzy logging server. Must be the same in the buzzy.yml |
| METEOR_SETTINGS.public.BUZZY_LOGGING_SERVER | URL you are deploying Buzzy logging to, including https:// |
| METEOR_SETTINGS.public.BUZZY_APP_SERVER | Buzzy URL |
| Ingress.spec.rules.host | hostname for Buzzy logging, excluding https://  |

1. Create your services   
`kubectl apply -f buzzy-logging.yml`   
1. Add new DNS record for Buzzy URL   
ie `logging.buzzy.net.au`

### Add Websphere Config
Please follow [these instructions](/buzzy/buzzy-wasconfig/)

### Add Header Integration
Please follow [these instructions](/buzzy/buzzy-header/)

### Add IBM Connections widgets
Please follow [these instructions](/buzzy/buzzy-widgets/)
