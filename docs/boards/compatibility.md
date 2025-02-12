# Compatibility with Huddo Boards Docker

## Known Compatible

Huddo Boards Docker has been tested and confirmed working with the following versions

|            | Minimum | Maximum   | Notes                                             |
| ---------- | ------- | --------- | ------------------------------------------------- |
| Kubernetes | `v1.16` | `v1.31.5` |                                                   |
| MongoDB    | `v4.0`  | `v7.0.x`  | Last supported images for `v3.6` was `2025-01-07` |
| Redis      | `v4.0`  | `v7.0`    |                                                   |

---

## Known Incompatible

### Azure Cosmos DB

**Issue**

Unfortunately the Azure Cosmos DB only supports a subset of the MongoDB API. They are working on reducing the gaps. There have been many requests to handle nested indexes and we believe Microsoft are working on it;

[https://feedback.azure.com/d365community/idea/3ddf6028-0f25-ec11-b6e6-000d3a4f0858](https://feedback.azure.com/d365community/idea/3ddf6028-0f25-ec11-b6e6-000d3a4f0858)

[https://feedback.azure.com/d365community/idea/ad9a64e6-0e25-ec11-b6e6-000d3a4f0858](https://feedback.azure.com/d365community/idea/ad9a64e6-0e25-ec11-b6e6-000d3a4f0858)

**Suggestion**

If Azure is a requirement, we would suggest looking at MongoDB Atlas on Microsoft Azure. This is a fully feature compliant MongoDB hosted in Azure.

---

Please contact us at [support@huddo.com](mailto:support@huddo.com) if you need further information.
