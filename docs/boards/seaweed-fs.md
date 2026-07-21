# Migration Guide: MinIO to SeaweedFS (huddo-boards-cp)

## Background

MinIO changed its licence from Apache 2.0 to AGPLv3, which introduces compliance concerns for customers deploying Huddo charts. `huddo-boards-cp` v2.1.0 introduces [SeaweedFS](https://github.com/seaweedfs/seaweedfs) (Apache 2.0) as the replacement S3-compatible object store.

SeaweedFS deploys **alongside** MinIO by default, so existing installations continue to work without interruption. A built-in migration Job uses `rclone` to copy data from MinIO to SeaweedFS, and the cutover is a simple values change.

---

## What changed in v2.1.0

| Component | Before | After |
|---|---|---|
| S3 store | MinIO (AGPLv3) — always deployed | MinIO (conditional, `minio.enabled: true` by default) + SeaweedFS (always deployed) |
| S3 endpoint default | `huddo-boards-cp-minio-service:9000` | Unchanged by default — apps still point at MinIO until you switch |
| S3 bucket default | `kudos-boards` | `huddo-boards` (rebrand) |
| New subchart | — | `huddo-s3` (SeaweedFS, port 8333) deployed as `huddo-boards-cp-s3` |
| Migration Job | — | `rclone sync` Job, opt-in via `s3.migration.enabled: true` |

**Upgrading to v2.1.0 alone changes nothing for your apps.** MinIO remains the active S3 backend. SeaweedFS runs alongside it but receives no traffic until you explicitly redirect the apps.

> **Bucket rename:** v2.1.0 changes the default S3 bucket name from `kudos-boards` to `huddo-boards`. Migration copies legacy data from MinIO `kudos-boards` to SeaweedFS `huddo-boards`. Existing installs must keep reading the legacy bucket name during Phase 1 (override `global.env.S3_BUCKET: kudos-boards`) and drop the override at cutover so apps fall back to the new default.

---

## Prerequisites

- `huddo-boards-cp` v2.1.0 or later
- Your existing MinIO is healthy and accessible
- Enough storage capacity for SeaweedFS to hold a copy of your data during migration

### Know your current S3 configuration

Check your deployed values for the S3 settings your apps are using:

```bash
helm get values <release> -n <namespace> | grep -i s3
```

The v2.1.0 chart defaults are:

```yaml
global:
  env:
    S3_ENDPOINT: huddo-boards-cp-minio-service
    S3_ACCESS_KEY: ioueygr4t589
    S3_SECRET_KEY: 7a863d41-2d8f-4143-bc8a-02501edbea6f
    S3_BUCKET: huddo-boards   # was 'kudos-boards' in <2.1.0
```

If you have overridden any of these, use your actual values in the migration configuration below. Existing installs running pre-2.1.0 will have data in the legacy bucket `kudos-boards` — see the bucket rename note above.

---

## Migration steps

### Phase 1 — Deploy SeaweedFS and migrate data

Apps continue to read and write to MinIO during this phase. SeaweedFS deploys alongside it and the migration Job copies all objects from MinIO to SeaweedFS.

Add the following to your values file:

```yaml
global:
  env:
    # Existing installs only — pin apps to the legacy MinIO bucket name during migration.
    # Drop this override at cutover (Phase 2) to use the new chart default 'huddo-boards'.
    S3_BUCKET: kudos-boards

s3:
  persistence:
    # NFS (recommended for existing NFS-based installations):
    nfs:
      server: <nfs-server>
      path: /pv-connections/huddo-boards-s3
    # Or for dynamic storage provisioning:
    # storageClassName: fast
  migration:
    enabled: true
    source:
      endpoint: "http://huddo-boards-cp-minio-service:9000"
      accessKey: ioueygr4t589
      secretKey: 7a863d41-2d8f-4143-bc8a-02501edbea6f
      bucket: kudos-boards
```

The migration job copies `minio:kudos-boards` → `seaweedfs:huddo-boards` (the new chart-default bucket name).

> **Important:** `s3.persistence` is required. Without it SeaweedFS has no durable storage and data will be lost on pod restart.

> **Note:** If your MinIO secret key is stored in a Kubernetes Secret rather than in plain text, use `secretKeyRef` instead of `secretKey`:
> ```yaml
> s3:
>   migration:
>     enabled: true
>     source:
>       endpoint: "http://huddo-boards-cp-minio-service:9000"
>       accessKey: ioueygr4t589
>       secretKeyRef:
>         name: my-minio-secret
>         key: secret-key
>       bucket: kudos-boards
> ```

Run the upgrade:

```bash
helm upgrade huddo-boards-cp \
  https://docs.huddo.com/assets/config/kubernetes/huddo-boards-cp-2.3.3.tgz \
  -n <namespace> \
  -f <your-values.yaml>
```

### Verify migration progress

The migration runs as a Kubernetes Job. Find the Job name (it includes the Helm release revision):

```bash
kubectl get jobs -n <namespace> | grep migration
```

Follow the rclone logs:

```bash
kubectl logs -n <namespace> job/<job-name-from-above> -f
```

When complete, the Job will log object counts and total size.

### Verify data integrity

As of chart `2.3.3`, the migration Job runs a verification pass after the sync (on by default via `s3.migration.verify: true`) and prints the report straight to its own logs — no separate pod needed. The Job is retained for 1 hour after it finishes, so read the report with:

```bash
kubectl logs -n <namespace> job/huddo-boards-cp-s3-migration-<revision>
```

The report shows:

- **Totals** — object count and total size for source and destination, side by side.
- **Missing on destination** — source objects that were not copied. Should be `(none)`.
- **Size mismatch** — objects that copied but differ in size (partial/corrupt copy). Should be `(none)`.
- **Extra on destination** — objects on SeaweedFS not present in MinIO (orphans from an earlier partial run). Usually harmless, but flagged so you can spot a wrong-bucket mistake.

Comparison is size-only, so it is cheap and does not download objects.

```
>> Missing on destination (source objects not copied):
  (none)
>> Size mismatch (partial or corrupt copy):
  (none)
>> Extra on destination (orphans not present in source):
  (none)
All three lists '(none)' => data fully migrated.
```

> **Interpreting a small difference on a busy system:** apps keep writing to MinIO *during* Phase 1, so the source can legitimately grow past the destination after the sync snapshot — a handful of "missing on destination" objects with recent timestamps is expected, not a fault. What matters is *which* objects differ (the report names them), not the raw count. Empty directory markers, zero-byte placeholders, and incomplete multipart uploads on MinIO also account for small gaps and are safe to ignore. To get a stable zero, freeze writes and run one final sync before cutover (see Phase 2).

If you disabled `s3.migration.verify`, are on an older chart, or need to re-check without re-running the sync, run rclone against both endpoints from a throwaway pod (the migration pod itself is gone once the Job finishes):

```bash
kubectl run rclone-check --rm -it --image=rclone/rclone:latest -n <namespace> -- \
  check \
  ':s3,provider=Other,access_key_id=<key>,secret_access_key=<secret>,endpoint="http://huddo-boards-cp-minio-service:9000",force_path_style=true:kudos-boards' \
  ':s3,provider=Other,access_key_id=<key>,secret_access_key=<secret>,endpoint="http://huddo-boards-cp-s3:8333",force_path_style=true:huddo-boards' \
  --size-only --one-way --missing-on-dst -
```

> **Note:** the `endpoint` value contains a `:`, so it must be double-quoted inside the connection string (and the whole remote single-quoted so the shell keeps the double quotes) — otherwise rclone truncates the endpoint at the first colon and fails with ``Custom endpoint `http` was not a valid URI``.

> **Tip for large datasets:** If your data is too large for a single Job run (e.g. the Job times out or the pod is evicted), you can safely run the upgrade again. The migration Job uses `rclone sync`, which is idempotent — it only copies objects that are missing or changed in the destination.

---

### Phase 2 — Cutover to SeaweedFS

Once you have verified the data is fully migrated, redirect the apps to SeaweedFS and disable MinIO.

Update your values file:

```yaml
global:
  env:
    S3_ENDPOINT: huddo-boards-cp-s3
    S3_PORT: '8333'
    S3_USE_SSL: 'false'
    # Drop the Phase 1 'S3_BUCKET: kudos-boards' override here so apps fall back
    # to the chart default 'huddo-boards' (matches the SeaweedFS dest bucket).

minio:
  enabled: false

s3:
  migration:
    enabled: false
```

> **Note:** If you previously had a non-default `S3_SECRET_KEY` or used `secretKeyRef` to supply credentials, ensure `global.env.S3_SECRET_KEY` (or its secret reference) is set to the same credentials you configured for SeaweedFS in Phase 1.

Run the upgrade:

```bash
helm upgrade huddo-boards-cp \
  https://docs.huddo.com/assets/config/kubernetes/huddo-boards-cp-2.3.3.tgz \
  -n <namespace> \
  -f <your-values.yaml>
```

This will:
1. Update the `S3_ENDPOINT` env var in all app pods, triggering a rolling restart
2. Remove the MinIO Deployment, Service, PVC and PV (all rendered from the conditional dependency)
3. Remove the migration Job

> **Note:** Helm prunes the MinIO PVC and PV when `minio.enabled: false` because they are rendered from the conditional `huddo-minio-cp` dependency. The underlying NFS data on the server is **not** affected — those files persist independently of the K8s objects, so a rollback (re-enable `minio.enabled: true`) will rebind to the same NFS path. If you want to permanently reclaim the NFS data after the soak period, delete the files on the NFS server manually:
> ```bash
> # On the NFS server (example path — confirm with your minio.nfs.path value):
> rm -rf /pv-connections/huddo-boards-minio
> ```

---

## Verification

### 1. Apps are using SeaweedFS

Confirm the `S3_ENDPOINT` env var on any app pod points to `huddo-boards-cp-s3`:

```bash
kubectl get pod -n <namespace> -l app=<release>-app \
  -o jsonpath='{.items[0].spec.containers[0].env}' | grep -A1 S3_ENDPOINT
```

### 2. MinIO is removed

```bash
kubectl get deploy -n <namespace> | grep minio
# Should return nothing
```

### 3. SeaweedFS is healthy

```bash
kubectl get pods -n <namespace> | grep huddo-boards-cp-s3
# Should show 1/1 Running
```

### 4. Functional verification

- Log in to Huddo Boards and confirm the board list loads
- Open a board with file attachments and confirm files download correctly
- Upload a new file attachment and confirm it persists

---

## Troubleshooting

### Migration Job stays in `Pending` state

The rclone container cannot be scheduled. Check for resource constraints:

```bash
kubectl get jobs -n <namespace> | grep migration
kubectl describe job <job-name> -n <namespace>
```

### Migration Job fails with `NoSuchBucket` on destination

The bucket creation Job must complete before the migration Job starts. The migration Job polls and waits for SeaweedFS to be ready, but if the bucket setup Job itself failed, check its logs:

```bash
kubectl logs -n <namespace> job/huddo-boards-cp-s3-bucket-setup
```

Then re-run the upgrade.

### Apps return errors after cutover

If the cutover was premature (data not fully migrated), roll back by pointing apps at MinIO again:

```yaml
global:
  env:
    S3_ENDPOINT: huddo-boards-cp-minio-service
    S3_BUCKET: kudos-boards
    # Remove S3_PORT and S3_USE_SSL overrides to restore defaults

minio:
  enabled: true
```

```bash
helm upgrade huddo-boards-cp \
  https://docs.huddo.com/assets/config/kubernetes/huddo-boards-cp-2.3.3.tgz \
  -n <namespace> \
  -f <your-values.yaml>
```

This immediately restores MinIO as the active backend with no data loss.

### `rclone` is slow on large datasets

The default configuration uses 8 parallel transfers and 16 checkers. For very large datasets, you can exec into the migration pod and run rclone manually with tuned settings, or increase the Job timeout by adjusting `spec.activeDeadlineSeconds`.

Alternatively, run the migration outside of the Helm Job entirely:

```bash
kubectl run rclone-manual --rm -it --image=rclone/rclone:latest -n <namespace> -- \
  sync \
  ':s3,provider=Other,access_key_id=<key>,secret_access_key=<secret>,endpoint="http://huddo-boards-cp-minio-service:9000",force_path_style=true:kudos-boards' \
  ':s3,provider=Other,access_key_id=<key>,secret_access_key=<secret>,endpoint="http://huddo-boards-cp-s3:8333",force_path_style=true:huddo-boards' \
  --progress --transfers 16 --checkers 32
```

### Reclaiming MinIO data after the soak period

Helm prunes the MinIO PVC and PV automatically when `minio.enabled: false` (they come from the conditional `huddo-minio-cp` dependency). The NFS-backed data is **not** affected — files at the configured `minio.nfs.path` on the NFS server remain in place so that re-enabling MinIO rebinds to the same data. Once you are confident the SeaweedFS cutover is stable, delete the data on the NFS server manually:

```bash
# Example — adjust path to match your minio.nfs.path value:
rm -rf /pv-connections/huddo-boards-minio
```
