# Boards Helm Chart versions log

## kudos-boards-cp

Component Pack offering that bundles Minio, and utilises the existing MongoDB & Redis.

- 1.0.0 - Initial Boards CP
- 1.1.0 - Kube v1.17 support
- 1.1.1 - Kube v1.17 support - minio v1.1.1
- 2.0.0 - Kube v1.17 support, HTTP Requester/Responder, LivenessProbes, legacyKube
- 2.0.1 - Ingress controller 0.22+ support
- 3.0.0 - Webhooks, Annotations for Socket cookie, support service.nodePort
- 3.0.1 - Minio root credentials, nfs mountOptions

## kudos-boards

Standalone Boards offering that optionally bundles Redis, but requires an external MongoDB & Minio store.

- 3.0.0 - First on-prem. Support webfront port 8080, custom env links (docs, support email)
- 3.1.0 - Support Kube v1.17.2
- 3.1.1 - Increase replicas to 2
- 3.1.2 - Option to disable Redis
- 3.1.3 - PodAntiAfinity
- 4.0.0 - Load Balancer (no cote), LivenessProbes, StartupProbes, Rename balancer dns defaults, add Activity Migration env & remove podIP, global.legacyKube
- 5.0.0 - Boards Notifications (webhooks), support service.nodePort
- 5.1.0 - Optional per-Deployment imageTagSuffix
