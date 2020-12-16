# Deploy S3 Storage

Buzzy requires an S3 object store. This documentation will deploy a Minio S3 storage container into the Kubernetes setup.

If you already have externally hosted AWS compatible S3 storage skip this step.


### Prerequisites

1. [Config file](/assets/config/buzzy-minio.yaml) downloaded

---

### Update config file

| Line | Key                | Default Value                          | Description                             |
| ---- | ------------------ | -------------------------------------- | --------------------------------------- |
| 21   | `nfs.path`         | `/pv-buzzy/minio`                      | Path to storage location                |
| 22   | `nfs.server`       | `STORAGE_SERVER_IP`                    | IP of NFS server</br>ie `192.168.10.50` |
| 69   | `MINIO_ACCESS_KEY` | `ioueygr4t589`                         | Access credential                       |
| 71   | `MINIO_SECRET_KEY` | `7a863d41-2d8f-4143-bc8a-02501edbea6f` | Access credential                       |
| 106   | Ingress.spec.rules.host | minio.buzzy.net | Hostname to access minio on externally                       |
---

### Deploy instructions

1.  Create the folder at `nfs.path` location on the `nfs.server` with access `777`

    **Note:** please ensure sufficient storage is available (ie 100GB)

1.  Ensure each Node in your Kubernetes cluster can mount this location.

    Please modify the file `/etc/exports` on your NFS Server to include this line

        <NFS_PATH_FOR_MINIO> <IP_RANGE_OF_YOUR_SERVERS>/<SUBNET_MASK>(rw,no_root_squash)

    For example:

        /pv-buzzy/minio 192.168.0.0/255.255.0.0(rw,no_root_squash)

    Apply new NFS storage to exports

        exportfs -ra

1.  Install Minio

        kubectl apply -f ./minio.yaml

---

### Outcomes

The following are the parameters required to connect to this S3 storage. You will need these later in the application setup. If you have your own S3 storage, please substitute your values.

| Key             | Default Value                          | Description                                             |
| --------------- | -------------------------------------- | ------------------------------------------------------- |
| `S3_ENDPOINT`   | `minio-service` or https://minio.buzzy.net| Hostname of this service</br>|
| `S3_ACCESS_KEY` | `ioueygr4t589`                         | Credential configured above                             |
| `S3_SECRET_KEY` | `7a863d41-2d8f-4143-bc8a-02501edbea6f` | Credential configured above                             |
