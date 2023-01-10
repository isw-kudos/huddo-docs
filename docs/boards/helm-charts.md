
# Helm Chart History

Release notes for each Helm chart utilised by Boards (for Component Pack vs standalone, and Activity Migration)

!!! warning "Important"
    As of January 2023 we have moved our image hosting. Please [follow this guide](/boards/images/) to configure your Kubernetes with access to our images hosted in Quay.io.

---

## Standalone Kubernetes

### huddo-boards

- [1.0.0](/assets/config/kubernetes/huddo-boards-1.0.0.tgz)

### huddo-boards-activity-migration

- [1.0.0](/assets/config/kubernetes/huddo-boards-activity-migration-1.0.0.tgz)

---

## For Component Pack

### huddo-boards-cp

!!! danger

    As of `huddo-boards-cp-1.0.0.tgz` we have changed the Minio pods to run as `user 1000` instead of `root`.
    You must perform the following command on the shared drive (`/pv-connections` file system) before using this new chart. The change is backwards compatible.

        cd /pv-connections/kudos-boards-minio/
        chown 1000:1000 -R .

- [1.0.0](/assets/config/kubernetes/huddo-boards-cp-1.0.0.tgz)

### huddo-boards-cp-activity-migration

- [1.0.0](/assets/config/kubernetes/huddo-boards-cp-activity-migration-1.0.0.tgz)

---

!!! info
    The previous chart information has [moved here](/boards/helm-charts-kudos/)