# Collab Releases (change log)

## How To Upgrade

### Docker Compose (AIO)

Edit `IMAGE_TAG` in your `.env` file to the new release date, then pull and restart:

```bash
docker compose pull
docker compose up -d
```

### Kubernetes (Component Pack)

Use the appropriate helm upgrade command with the latest [helm chart](helm-charts.md).

---

## Releases

!!! note

    Updates may include minor schema migrations. If you need to downgrade, back up the MongoDB database before updating.

### 2025

#### 2025-01-15

Initial release of Huddo Collab docker compose AIO deployment.