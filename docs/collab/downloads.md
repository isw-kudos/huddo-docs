# three thirds collaboration downloads app

## Installation

This application uses common code from the [admin app](/collab/admin) please follow the guide there.

## Environment Variables

Update these values in the .env file

| Name               | Description                              | Example                       |
| ------------------ | ---------------------------------------- | ----------------------------- |
| DOWNLOADS_URI      | Downloads app uri                        | downloads.testna.collab.cloud |
| DOWNLOADS_LOCATION | Location on disk to serve downloads from | ~/Downloads                   |

---

This application is served from the core service in the admin app, you can see its logs with `docker-compose logs core`
