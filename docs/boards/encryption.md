# Huddo Boards — Encryption & Cryptography Reference

**Audience:** IT / Security teams  
**Applies to:** Huddo Boards and huddo-services  
**Date:** 2026-05-29

---

## 1. Overview

Huddo Boards uses industry-standard cryptographic algorithms across several functional areas: session and token authentication, license data protection, OAuth federation, webhook integrity, and database transport security. This document enumerates each usage with its algorithm, key parameters, and the data it protects.

No passwords are stored by Huddo Boards itself. All user authentication is delegated to external identity providers (OIDC/OAuth 2.0) or enterprise SSO systems.

---

## 2. Symmetric Encryption

### 2.1 License Data — AES-256-CBC

| Parameter | Value |
|-----------|-------|
| Algorithm | AES (Advanced Encryption Standard) |
| Mode | CBC (Cipher Block Chaining) |
| Key size | 256 bits |
| IV size | 128 bits (16 bytes) |
| Key derivation | SHA-256 of caller-supplied key string |
| Encoding | Hex-encoded ciphertext |

**Location:** `huddo-services/apps/licence/src/models/Encrypted.ts`

**Data protected:** Trial licence records, including subscription expiry dates, extension data, user identifiers, and product entitlements. Each trial record is encrypted with a unique organisation-scoped key.

---

## 3. Asymmetric Encryption

### 3.1 Licence Payload Decryption — RSA-OAEP

| Parameter | Value |
|-----------|-------|
| Algorithm | RSA |
| Padding | OAEP (Optimal Asymmetric Encryption Padding) |
| Key size | 2048 bits |
| Key format | PEM-encoded X.509 certificate (public key) |
| Encoding | Base64, chunked |

**Location:** `huddo-services/apps/licence/src/models/Encrypted.ts`

**Data protected:** Licence entitlement payloads issued by Huddo's licence server. The application holds only the public key; the private key remains with the licence authority. Chunked payloads are decrypted and reassembled before JSON parsing.

---

## 4. Hashing & Message Authentication

### 4.1 PKCE Code Challenge — SHA-256

| Parameter | Value |
|-----------|-------|
| Algorithm | SHA-256 |
| Input | 32 random bytes (base64url-encoded verifier) |
| Output | 32-byte digest, base64url-encoded |
| Method | S256 (as per RFC 7636) |

**Location:** `huddo-services/apps/user/src/config/provider/BaseOAuth.ts`

**Data protected:** OAuth 2.0 authorisation code flow for public clients. Prevents authorisation code interception attacks. Used with providers that support PKCE (Microsoft AD, Google, and others).

### 4.2 Webhook Payload Integrity — HMAC-SHA256

| Parameter | Value |
|-----------|-------|
| Algorithm | HMAC-SHA256 |
| Key source | `IDEAS_WEBHOOK_SECRET` environment variable |
| Output | Hex-encoded digest |

**Location:** `apps/core/src/webhooks/Ideas.ts`

**Data protected:** Incoming webhook payloads from the Ideas integration. The HMAC signature is verified before the payload is processed, ensuring authenticity and integrity of the webhook source.

### 4.3 Encryption Key Derivation — SHA-256

| Parameter | Value |
|-----------|-------|
| Algorithm | SHA-256 |
| Input | Caller-supplied key string |
| Output | 32-byte key (used directly as AES-256 key) |

**Location:** `huddo-services/apps/licence/src/models/Encrypted.ts`

**Purpose:** Derives a fixed-length 256-bit key from an arbitrary-length input string for use with AES-256-CBC (see §2.1).

---

## 5. JSON Web Tokens (JWT)

### 5.1 Internal Application Tokens — HS256

| Parameter | Value |
|-----------|-------|
| Algorithm | HS256 (HMAC with SHA-256) |
| Key type | Shared secret |
| Key source | `JWT_SECRET` environment variable |
| Optional claim | `iss` (issuer), via `JWT_ISSUER` environment variable |

**Location:** `huddo-services/apps/user/src/controllers/User.auth.controller.ts`

**Data protected:** User identity claims for internal service-to-service authentication. Tokens carry a user ID and are verified on each protected request.

### 5.2 OIDC Logout Tokens — RS256

| Parameter | Value |
|-----------|-------|
| Algorithm | RS256 (RSA with SHA-256) |
| Key source | Provider JWKS endpoint (fetched at runtime) |
| Verified claims | `aud` (audience), `iss` (issuer) |
| Replay protection | 5-minute timestamp window |

**Location:** `huddo-services/apps/user/src/controllers/User.auth.controller.ts`

**Data protected:** Back-channel logout tokens issued by OIDC providers. Tokens are verified against the provider's published JSON Web Key Set before a session is terminated.

### 5.3 Apple OAuth Client Secret — ES256

| Parameter | Value |
|-----------|-------|
| Algorithm | ES256 (ECDSA with P-256 and SHA-256) |
| Key type | EC private key |
| Key source | `APPLE_PRIVATE_KEY` environment variable |
| Token lifetime | 15,777,000 seconds (~6 months) |

**Location:** `huddo-services/apps/user/src/config/provider/AppleOAuth.ts`

**Data protected:** Short-lived client secret JWTs for Sign in with Apple service authentication, as required by Apple's OAuth specification.

---

## 6. Transport Security

### 6.1 MongoDB — TLS with X.509 Client Certificates

| Parameter | Value |
|-----------|-------|
| Protocol | TLS (version negotiated by MongoDB driver) |
| Authentication method | MONGODB-X509 |
| Client certificate | PEM file, path configured via `MONGO_CERT_USER` |
| CA certificate | `internal-ca-chain.cert.pem` (configurable) |

**Location:** `packages/mongo/src/config.ts`

**Data protected:** All data in transit between application services and MongoDB. When `MONGO_CERT_USER` is set, the client presents an X.509 certificate for mutual TLS authentication in addition to encrypting the connection.

### 6.2 HTTPS / TLS (HTTP layer)

All external-facing HTTP traffic is served over HTTPS. TLS termination is handled at the ingress layer (reverse proxy or load balancer). Application services communicate over private networks within the deployment environment.

---

## 7. Cookie Security

Session cookies issued by Huddo Boards are configured with the following attributes:

| Attribute | Default value | Effect |
|-----------|--------------|--------|
| `Secure` | `true` | Cookie transmitted only over HTTPS |
| `HttpOnly` | `true` | Cookie inaccessible to JavaScript (mitigates XSS theft) |
| `SameSite` | `none` | Permits cross-origin requests (required for embedded use cases) |

**Location:** `apps/core/src/config/index.ts`

---

## 8. OAuth 2.0 Client Credentials

Client secrets for third-party identity providers (Google, Microsoft, GitHub, LinkedIn, Facebook, Slack, HCL Domino, HCL Connections, and Apple) are supplied exclusively via environment variables and are never persisted to the database or included in application bundles.

---

## 9. Summary Table

| Area | Algorithm | Key / Digest size | Standard reference |
|------|-----------|------------------|--------------------|
| Licence encryption | AES-256-CBC | 256-bit key, 128-bit IV | NIST FIPS 197, SP 800-38A |
| Licence decryption | RSA-OAEP | 2048-bit | PKCS #1 v2.2, RFC 8017 |
| PKCE challenge | SHA-256 | 256-bit | RFC 7636 |
| Webhook integrity | HMAC-SHA256 | 256-bit | RFC 2104 |
| Key derivation | SHA-256 | 256-bit output | NIST FIPS 180-4 |
| Internal JWT signing | HS256 | 256-bit | RFC 7518 §3.2 |
| OIDC logout tokens | RS256 | 2048-bit | RFC 7518 §3.3 |
| Apple OAuth signing | ES256 (P-256) | 256-bit | RFC 7518 §3.4 |
| MongoDB transport | TLS + X.509 | Per TLS negotiation | RFC 8446 |

---

## 10. Notes on Password Storage

Huddo Boards does not manage user passwords directly. Authentication is performed entirely through:

- OIDC / OAuth 2.0 federation with external providers (Google, Microsoft, Apple, GitHub, LinkedIn, Slack, Facebook)
- Enterprise SSO via HCL Connections, HCL DX, or HCL Domino
- IBM Connections LTPA token pass-through

Credential storage and password hashing are the responsibility of the upstream identity provider in each case.
