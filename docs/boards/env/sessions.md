# Session Expiry

Boards sessions expire automatically. Browser sessions end after **90 days**, and users simply sign in again. API keys (used for integrations and personal calendar feeds) last **12 months** — and a key that is still in active use for a calendar feed is extended automatically, so feeds keep working without any action.

The defaults suit most deployments. To change them, set the following environment variables:

| Key                                        | Description                                                                                                                                                         | Default |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `user.env.SESSION_EXPIRY_UI_DAYS`          | **Optional**: Lifetime of a browser session in days, from sign-in. After this the user signs in again.                                                              | `90`    |
| `user.env.SESSION_EXPIRY_API_DAYS`         | **Optional**: Lifetime of an API key in days, from creation.                                                                                                        | `365`   |
| `user.env.SESSION_EXPIRY_EXTEND_WITHIN_DAYS` | **Optional**: A key used for a calendar feed within this many days of expiring is extended automatically.                                                          | `30`    |
| `user.env.SESSION_EXPIRY_EXTEND_DAYS`      | **Optional**: How far (in days from now) an automatic extension pushes the expiry. Never less than `SESSION_EXPIRY_EXTEND_WITHIN_DAYS`.                             | `90`    |
| `user.env.SESSION_EXPIRY_GRACE_DAYS`       | **Optional**: On first start after upgrading, API keys that are already past their lifetime remain valid for this many days before expiring.                        | `7`     |

Values are numbers of days. Changes apply to sessions created after the change — existing sessions keep the lifetime they were issued with.

!!! info

    Session expiry cannot be disabled. Values of `0` or below are ignored and the default applies. For an effectively unlimited lifetime, set a large value (up to `36500`, i.e. 100 years).

---

### Upgrading

On first start after upgrading, existing sessions are given an expiry:

- Users whose sign-in is older than the browser session lifetime will sign in again.
- API keys older than their lifetime remain valid for the grace period (`SESSION_EXPIRY_GRACE_DAYS`). A calendar feed that is still being fetched extends its key automatically within that window and keeps working. Keys that stay unused through the grace period expire.

Generating a new API key never invalidates existing keys — each key expires on its own schedule, so a new key can be issued without breaking a calendar feed that uses an older one.
