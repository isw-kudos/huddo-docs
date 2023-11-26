# Domino Callback URL

**Huddo Boards Cloud**: Boards cloud uses a base64 encoded version of your Domino Server domain, you can use a service like [https://www.base64encode.org/](https://www.base64encode.org/) to achieve this, the callback format looks like this: `https://boards.huddo.com/auth/domino/[ encoded domain ]/callback`

> e.g. for domain proton.example.com the callback url would be https://boards.huddo.com/auth/domino/cHJvdG9uLmV4YW1wbGUuY29t/callback

**Huddo Boards On Prem**: For an on premise installation we use a global authentication setup so the callback url does not need an id. depending on your deployment it could look like one of the following:

- `https://boards.your.domain.com/auth/domino/callback`
- `https://your.domain.com/boards/auth/domino/callback` if you have a context root (i.e. you would access boards application at /boards).
