# Helm Chart History

Release notes for each Helm chart utilised by Boards

!!! warning "Important"

    As of January 2023 we have moved our image hosting. Please [follow this guide](./images.md) to configure your Kubernetes with access to our images hosted in Quay.io.

---

## For Component Pack

### huddo-boards-cp

!!! danger

    As of `huddo-boards-cp-2.0.0.tgz` we have migrated from ingress-nginx to Traefik. Please follow our [migration guide](./traefik.md).

!!! tip

    As of `huddo-boards-cp-2.1.0.tgz` we have added SeaweedFS S3 storage with a migration path from MinIO. We recommend this as a replacement for MinIO. See [SeaweedFS migration guide](./seaweed-fs.md).

| Version                                                          | Description                                                                                                            | Breaking Changes                                       |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| [1.0.0](../assets/config/kubernetes/huddo-boards-cp-1.0.0.tgz)   | Initial release (Huddo)                                                                                                | No                                                     |
| [1.1.0](../assets/config/kubernetes/huddo-boards-cp-1.1.0.tgz)   | CNX 8 fix for Mongo 5                                                                                                  | No                                                     |
| [1.1.1](../assets/config/kubernetes/huddo-boards-cp-1.1.1.tgz)   | Support custom `storageClassName` instead of PV                                                                        | No                                                     |
| [1.2.0](../assets/config/kubernetes/huddo-boards-cp-1.2.0.tgz)   | Added readiness probes on each service                                                                                 | No                                                     |
| [1.2.1](../assets/config/kubernetes/huddo-boards-cp-1.2.1.tgz)   | Fix ingress session cookie `SameSite` setting (polling in a CORS frame, e.g. Teams)                                    | No                                                     |
| [1.3.0](../assets/config/kubernetes/huddo-boards-cp-1.3.0.tgz)   | Support CNX 8 Mongo 7 (use ConfigMap `mongo-name` instead of `mongo5-rs-members-hosts`) with images after `2025-02-13` | No                                                     |
| [1.3.1](../assets/config/kubernetes/huddo-boards-cp-1.3.1.tgz)   | Change `ingress.pathType` to `ImplementationSpecific` to allow regex rewrites                                          | Potentially – may affect ingress matching behaviour    |
| [1.4.0](../assets/config/kubernetes/huddo-boards-cp-1.4.0.tgz)   | Support CNX 8 CR13 cache rename - new environment variables in ConfigMap and Secret references                          | No                                                     |
| [2.0.0](../assets/config/kubernetes/huddo-boards-cp-2.0.0.tgz)   | Move from ingress-nginx to [traefik](./traefik.md)                                                                     | **Yes** – [migration required](./traefik.md)           |
| [2.1.0](../assets/config/kubernetes/huddo-boards-cp-2.1.0.tgz)   | Add SeaweedFS S3 storage with migration path from MinIO                                                                | Optional – migration only if adopting SeaweedFS        |
| [2.2.0](../assets/config/kubernetes/huddo-boards-cp-2.2.0.tgz)   | Merge activity-migration as optional component (`migration.enabled`, default `false`)                                  | No – uninstall the standalone activity-migration release before enabling |
| [2.3.0](../assets/config/kubernetes/huddo-boards-cp-2.3.0.tgz)   | Auto-create secrets: CA bundle mount (`global.internalCa`), `extraObjects`, and `imageCredentials` (image pull secret) | No                                                     |

#### Upgrade command

```bash
helm upgrade huddo-boards-cp https://docs.huddo.com/assets/config/kubernetes/huddo-boards-cp-2.3.0.tgz -i -f ./boards-cp.yaml --namespace connections
```

!!! note

    Boards images are date-tagged, so each release changes the global env and pods are recreated automatically on upgrade.

### huddo-boards-cp-activity-migration (DEPRECATED)

!!! note

    This chart is deprecated as it has been merged into `huddo-boards-cp` chart as of `v2.2.0` as an optional component. Set `migration.enabled: true` in your values file to enable it.

    **Before enabling**, uninstall any existing standalone release — both create the same PersistentVolume (`connections-shared-drive`), PersistentVolumeClaim (`connections-shared-drive-claim`) and Service (`boards-activity-migration`):

        helm uninstall huddo-boards-cp-activity-migration --namespace connections

| Version | Description                                                                                                                                                       | Breaking Changes  |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| [1.0.0](../assets/config/kubernetes/huddo-boards-cp-activity-migration-1.0.0.tgz)  | Initial release (Huddo)                                                                | No                |  
| [1.1.0](../assets/config/kubernetes/huddo-boards-cp-activity-migration-1.1.0.tgz)  | CNX 8 fix for Mongo 5                                                                  | No                |
| [1.2.0](../assets/config/kubernetes/huddo-boards-cp-activity-migration-1.2.0.tgz)  | Fix resource limits                                                                    | No                |
| [1.3.0](../assets/config/kubernetes/huddo-boards-cp-activity-migration-1.3.0.tgz)  | Support CNX 8 Mongo 7                                                                  | No                |
| [1.4.0](../assets/config/kubernetes/huddo-boards-cp-activity-migration-1.4.0.tgz)  | Support CNX 8 CR13 cache rename - new env variables in ConfigMap and Secret references | No                |

---

## Standalone Kubernetes

!!! danger

    As of `huddo-boards-2.0.0.tgz` we have migrated from ingress-nginx to Traefik. Please follow our [migration guide](./traefik.md).

### huddo-boards

| Version | Description                                                                                                                                | Breaking Changes                                       |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| [1.0.0](../assets/config/kubernetes/huddo-boards-1.0.0.tgz)   | Initial release (Huddo)                                                              | No                                                     |
| 1.1.0                                                         | Allow additionalPaths on huddo-app ingress                                           | No                                                     |
| [1.1.1](../assets/config/kubernetes/huddo-boards-1.1.1.tgz)   | Fix ingress session cookie `SameSite` setting (polling in a CORS frame, e.g. Teams)  | No                                                     |
| [2.0.0](../assets/config/kubernetes/huddo-boards-2.0.0.tgz)   | Move from ingress-nginx to [traefik](./traefik.md)                                   | **Yes** – [migration required](./traefik.md)           |
| [2.1.0](../assets/config/kubernetes/huddo-boards-2.1.0.tgz)   | Auto-create secrets: CA bundle mount (`global.internalCa`), `extraObjects`, and `imageCredentials` (image pull secret)  | No                                                     |

#### Upgrade command

```bash
helm upgrade huddo-boards https://docs.huddo.com/assets/config/kubernetes/huddo-boards-2.1.0.tgz -i -f ./boards.yaml --namespace boards
```

!!! note

    Boards images are date-tagged, so each release changes the global env and pods are recreated automatically on upgrade.

### huddo-boards-activity-migration

| Version | Description                                                                                       | Breaking Changes                                       |
| ------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| [1.0.0](../assets/config/kubernetes/huddo-boards-activity-migration-1.0.0.tgz)   | Initial release (Huddo)  | No                                                     |  
| [1.2.0](../assets/config/kubernetes/huddo-boards-activity-migration-1.2.0.tgz)   | Fix resource limits      | No                                                     |

---

!!! info

    The previous chart information has [moved here](helm-charts-kudos.md)
