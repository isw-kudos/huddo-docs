
# Helm Chart History

Release notes for each Helm chart utilised by Boards (for Component Pack vs standalone, and Activity Migration)

---

## Standalone Kubernetes

### kudos-boards

- [4.0.0](/assets/config/kubernetes/kudos-boards-4.0.0.tgz) - Load Balancer (no cote), LivenessProbes, StartupProbes, Rename balancer dns defaults, add Activity Migration env & remove podIP, global.legacyKube
- [5.0.0](/assets/config/kubernetes/kudos-boards-5.0.0.tgz) - Boards Notifications (webhooks), support service.nodePort
- [5.2.0](/assets/config/kubernetes/kudos-boards-5.2.0.tgz) - Kube 1.22 support (use Capabilities.APIVersions)
- [5.2.1](/assets/config/kubernetes/kudos-boards-5.2.1.tgz) - Added default Ingress.class annotation 'nginx'

### kudos-boards-activity-migration

- [4.0.0](/assets/config/kubernetes/kudos-boards-activity-migration-4.0.0.tgz) - Load balancer (no cote), add Activity Migration env & remove podIP, global.legacyKube
- [5.0.0](/assets/config/kubernetes/kudos-boards-activity-migration-5.0.0.tgz) - Support service.nodePort, default volume & mount for share drive
- [5.2.0](/assets/config/kubernetes/kudos-boards-activity-migration-5.2.0.tgz) - use Capabilities.APIVersions instead of legacyKube

---

## For Component Pack

### kudos-boards-cp

- [1.0.0](/assets/config/kubernetes/kudos-boards-cp-1.0.0.tgz) - Boards CP
- [1.1.1](/assets/config/kubernetes/kudos-boards-cp-1.1.1.tgz) - Kube v1.17 support - minio v1.1.1
- [2.0.0](/assets/config/kubernetes/kudos-boards-cp-2.0.0.tgz) - Kube v1.17 support, HTTP Requester/Responder, LivenessProbes, legacyKube
- [2.0.1](/assets/config/kubernetes/kudos-boards-cp-2.0.1.tgz) - Ingress controller 0.22+ support
- [3.0.0](/assets/config/kubernetes/kudos-boards-cp-3.0.0.tgz) - Webhooks, Annotations for Socket cookie, support service.nodePort

    > This chart includes a new Boards service. In order to use the image from our repository with the component pack v3 chart you must add the new image tag.

    > As of **release 2021-06-09** you must move all the NOTIFIER_* environment variables from `core` to `events`. See [our documentation](/boards/env/common/) for all supported options.

    For example:

    ```yaml
    events:
      image:
        name: ""
        tag: boards-event
      env:
        NOTIFIER_EMAIL_HOST: <smtp-email-host>
        NOTIFIER_EMAIL_USERNAME: <smtp-email-username>
        NOTIFIER_EMAIL_PASSWORD: <smtp-email-password>
        # plus all other NOTIFIER options previously defined in core
    ```

- [3.0.1](/assets/config/kubernetes/kudos-boards-cp-3.0.1.tgz) - Minio root credentials, nfs mountOptions
- [3.1.0](/assets/config/kubernetes/kudos-boards-cp-3.1.0.tgz) - Kube 1.22 support (use Capabilities.APIVersions)
- [3.1.1](/assets/config/kubernetes/kudos-boards-cp-3.1.1.tgz) - Added default Ingress.class annotation 'nginx'


### kudos-boards-cp-activity-migration

- [1.0.0](/assets/config/kubernetes/kudos-boards-cp-activity-migration-1.0.0.tgz) - Boards CP Activity Migration
- [1.1.0](/assets/config/kubernetes/kudos-boards-cp-activity-migration-1.1.0.tgz) - Kude v1.17 support
- [2.0.0](/assets/config/kubernetes/kudos-boards-cp-activity-migration-2.0.0.tgz) - Kube v1.17 support, HTTP Requester/Responder, LivenessProbes
- [3.0.0](/assets/config/kubernetes/kudos-boards-cp-activity-migration-3.0.0.tgz) - Support service.nodePort, default volume & mount for share drive
- [3.0.1](/assets/config/kubernetes/kudos-boards-cp-activity-migration-3.0.1.tgz) - Support mountOptions for share drive
- [3.1.0](/assets/config/kubernetes/kudos-boards-cp-activity-migration-3.1.0.tgz) - use Capabilities.APIVersions instead of legacyKube