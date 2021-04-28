# Troubleshooting Huddo Boards Notifications

### Huddo Boards Docker

If notifications are not sending, please ensure that the core and notifications pod can talk to each other

```bash
kubectl exec -n connections -it (boards core pod) -- sh
env | grep NOTIFI
vi src/test.js (content below)
node src/test.js
```

Content for test.js:
 
```js
const fetch = require('node-fetch');
fetch(process.env.NOTIFICATION_HOST+':'+process.env.NOTIFICATION_PORT+'/health').then(console.log).catch(console.log);
```

If 200 status:

```bash
kubectl delete pod -n boards (core pod1)
kubectl delete pod -n boards (core pod2)
 ```
