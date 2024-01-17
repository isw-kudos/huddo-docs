# NGINX Errors

## 400 Bad Request

Nginx has strict rules around the headers allowed on requests. If you encounter a `400 Bad Request` response in your environment when accessing `/boards` it is likely caused by incorrect headers set in the upsteam proxy(s) before Boards.

To debug the cause, please views the logs for the webfront pods (as of build 20210924). You will see logs like:

      setting core: https://devconn7.internal.isw.net.au/api-boards
      setting buildId: 198
      setting product info url: https://huddo.com/boards
      setting force polling: true
      setting html base: /boards
      2021/09/24 01:10:49 [notice] 1#1: using the "epoll" event method
      2021/09/24 01:10:49 [notice] 1#1: nginx/1.21.3
      2021/09/24 01:10:49 [notice] 1#1: built by gcc 10.3.1 20210424 (Alpine 10.3.1_git20210424)
      2021/09/24 01:10:49 [notice] 1#1: OS: Linux 3.10.0-1160.15.2.el7.x86_64
      2021/09/24 01:10:49 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1048576:1048576
      2021/09/24 01:10:49 [notice] 1#1: start worker processes
      2021/09/24 01:10:49 [notice] 1#1: start worker process 20
      2021/09/24 01:10:49 [notice] 1#1: start worker process 21
      2021/09/24 01:10:49 [notice] 1#1: start worker process 22
      2021/09/24 01:10:49 [notice] 1#1: start worker process 23
      2021/09/24 01:15:37 [info] 20#20: *1 client 10.244.115.83 closed keepalive connection
      2021/09/24 01:15:38 [info] 31#31: *118 client sent invalid host header while reading client request headers, client: 172.20.0.1, server: boards.company.com, request: "GET / HTTP/1.1", host: "boards.company.com, boards.company.com"

In this example, the `client sent invalid host header while reading client request headers`. You can see the host is included twice. This can occur if the host is set twice, or in some instances when the `X-Forwarded-Host` is also set.

Please read this error carefully and make sure your environment complies with the latest [NGINX specification](https://docs.nginx.com/nginx/).

---

## Ingress & Proxy

To confirm if the problem is with the nginx layer above boards you can bypass it and directly test the Kubernetes ingress controller and deployment:

```sh
curl -H "Host: [CONNECTIONS_URL]" http://[KUBERNETES_NAME]:[KUBERNETES_PORT]/boards
curl -H "Host: [CONNECTIONS_URL]" http://[KUBERNETES_NAME]:[KUBERNETES_PORT]/api-boards
```

OR

```sh
ssh root@[KUBERNETES_MASTER]
curl -H "Host: [CONNECTIONS_URL]" http://localhost:32080/boards
curl -H "Host: [CONNECTIONS_URL]" http://localhost:32080/api-boards

```

For example:

```sh
curl -H "Host: connections.company.com" http://master.kube.company.com:32080/boards
curl -H "Host: connections.company.com" http://master.kube.company.com:32080/api-boards
```
