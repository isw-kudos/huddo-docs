# Minio FS Mode

This is a workaround to revert Minio to legacy fs mode. This is not recommended for new installations.

Place [this file](./format.json) at /pv-connections/kudos-boards-minio/.minio.sys/

Restart (delete) the minio pod to apply the changes.
