# Huddo Boards Versions
We are proud to say that Huddo Boards is able to run in many configurations to suit your individual requirements.

1. [Boards Cloud](cloud/index.md)
1. Boards Self-Hosted (On-Premise)
    - [HCL Connections Component Pack](cp/index.md)
    - [Kubernetes](kubernetes/index.md)
    - [Standalone](standalone.md)
1. [Boards Hybrid](hybrid.md) (Cloud integrated with HCL Connections On-Premise)

---

## How To Decide Which Version?


### Boards Cloud
This version is hosted by the ISW Huddo team at [https://boards.huddo.com](https://boards.huddo.com).</br>
Free trials are available!

__Advantages__

- Hosted and managed by Team Huddo
- Always up to date with the latest functionality
- Backup strategies already in place

See [here](cloud/index.md) for more information.


---

### Boards Self-Hosted (On-Premise)
> Our Boards Cloud product, installed locally in your infrastructure

__Advantages__

- Can be installed in any existing Kubernetes environment (ie HCL Connections Component Pack)
- Can use the same Component Pack Mongo database
- Control over your own data and backup strategies
- Simple to update

See install details for [Kubernetes](hybrid.md) or [HCL Connections Component Pack](cp/index.md).


---

<!-- ### Boards Docker (On-Premise) in Docker Swarm
Our Boards Cloud product, installed locally in your infrastructure. This is designed for those without existing Kubernetes environments.

__Advantages__

- Lightweight, on-premise clustered deployment.
- Control over your own data and backup strategies
- Simple to update

--- -->

### Boards Hybrid
(Cloud integrated with HCL Connections On-Premise.)
> This version is the best of both worlds if you already have HCL Connections but want the latest and greatest Boards functionality without managing more servers!  Huddo Boards Cloud can integrate with your existing HCL Connections on-premise installation.

__Advantages__

- All of the benefits of the Cloud above (hosted, managed, backed up)!!
- Integrates into your existing HCL Connections On-Premise (WebSphere)
- Looks and feels like another application similar to Communities/Blogs etc with:

    - Connections Apps menu link to 'Huddo Boards'
    - Connections header
    - Search and collaborate with your existing users
    - Search and utilise your existing Communities
    - Updates posted to your Activity Streams (Homepage, Social, Community)
    - Ability to import existing Activities into Boards

__Requirements__

- Your HCL Connections URL must be accessible from the web (no VPN)

See [installation details](hybrid.md) for more information.


---

__Browser Support__

We support the most recent two versions of the following browsers:

- Chrome
- Safari
- Firefox
- Microsoft Edge
