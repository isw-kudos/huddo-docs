# Configure CP S3 Storage Mount

### Deploy instructions

1.  Create the folder on the `nfs.server`

        sudo mkdir /pv-connections/kudos-boards-minio
        sudo chmod 755 /pv-connections/kudos-boards-minio


1.  Ensure each Node in your Kubernetes cluster can mount this location.

    Please modify the file `/etc/exports` on your NFS Server to include this line

        /pv-connections/kudos-boards-minio <IP_RANGE_OF_YOUR_SERVERS>/<SUBNET_MASK>(rw,no_root_squash)

    For example:

        /pv-connections/kudos-boards-minio 192.168.0.0/255.255.0.0(rw,no_root_squash)

1. Apply new NFS storage to exports

        exportfs -ra
