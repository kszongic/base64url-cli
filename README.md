# base64url-cli

[![npm version](https://img.shields.io/npm/v/@kszongic/base64url-cli)](https://www.npmjs.com/package/@kszongic/base64url-cli)
[![npm downloads](https://img.shields.io/npm/dm/@kszongic/base64url-cli)](https://www.npmjs.com/package/@kszongic/base64url-cli)
[![node](https://img.shields.io/node/v/@kszongic/base64url-cli)](https://nodejs.org)
![zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)
![cross-platform](https://img.shields.io/badge/platform-win%20%7C%20mac%20%7C%20linux-blue)
[![license](https://img.shields.io/npm/l/@kszongic/base64url-cli)](./LICENSE)

Encode and decode **URL-safe Base64** ([RFC 4648 §5](https://datatracker.ietf.org/doc/html/rfc4648#section-5)) from the command line. Zero dependencies.

```
$ base64url encode "Hello, World!"
SGVsbG8sIFdvcmxkIQ

$ base64url decode SGVsbG8sIFdvcmxkIQ
Hello, World!
```

## Why?

- 🔑 **JWT debugging** — decode JWT header/payload segments without pasting into a website
- 🔗 **URL parameters** — standard Base64 breaks URLs (`+`, `/`, `=`); URL-safe doesn't
- 📦 **Zero dependencies** — installs in under a second, no supply-chain bloat
- 🖥️ **Cross-platform** — identical behavior on Windows, macOS, and Linux
- 🔀 **Pipe-friendly** — reads from arguments or stdin, writes to stdout

## Install

```bash
npm install -g @kszongic/base64url-cli
```

Or run without installing:

```bash
npx @kszongic/base64url-cli encode "quick test"
```

## Usage

```bash
# Encode text → URL-safe Base64
base64url encode "Hello, World!"
# SGVsbG8sIFdvcmxkIQ

# Decode URL-safe Base64 → text
base64url decode SGVsbG8sIFdvcmxkIQ
# Hello, World!

# Short aliases
base64url e "secret data"
base64url d c2VjcmV0IGRhdGE

# Pipe from stdin
echo -n "pipe me" | base64url encode
cat token.bin | base64url encode
```

## Commands

| Command | Alias | Description |
|---------|-------|-------------|
| `encode` | `enc`, `e` | Encode text → URL-safe Base64 |
| `decode` | `dec`, `d` | Decode URL-safe Base64 → text |

## URL-safe Base64 vs Standard Base64

| Character | Standard | URL-safe |
|-----------|----------|----------|
| 62nd char | `+` | `-` |
| 63rd char | `/` | `_` |
| Padding | `=` (required) | Stripped |

Standard Base64 breaks URLs, query strings, and filenames. URL-safe Base64 is used in **JWTs**, **OAuth tokens**, **data URIs**, **S3 keys**, and **signed URLs**.

## Recipes

### Decode a JWT payload

```bash
# Extract the middle segment of a JWT and decode it
echo "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.abc" \
  | cut -d. -f2 \
  | base64url decode
# {"sub":"1234567890"}
```

### Encode a file for URL embedding

```bash
# Encode a small config file for a URL parameter
base64url encode "$(cat config.json)"
```

### Generate a URL-safe random token

```bash
# 32 random bytes → URL-safe Base64 token
head -c 32 /dev/urandom | base64url encode
```

### Verify round-trip integrity

```bash
# Encode then decode — should return the original
echo -n "round trip test" | base64url encode | base64url decode
# round trip test
```

### Batch decode tokens from a log file

```bash
# Decode all Base64URL tokens from a log
grep -oP '[A-Za-z0-9_-]{20,}' access.log | while read t; do
  echo "$t → $(base64url decode "$t")"
done
```

### Use in npm scripts

```json
{
  "scripts": {
    "token:decode": "base64url decode",
    "token:encode": "base64url encode"
  }
}
```

## How It Works

1. **Encode:** Converts input to a Node.js Buffer, runs standard Base64 encoding, then replaces `+` → `-`, `/` → `_`, and strips trailing `=`
2. **Decode:** Reverses the substitution (`-` → `+`, `_` → `/`), re-pads to a multiple of 4, then decodes standard Base64

No external libraries — just Node.js built-in `Buffer`.

## Use Cases

| Scenario | Example |
|----------|---------|
| **JWT inspection** | Decode header/payload without a browser |
| **OAuth debugging** | Inspect `state` and `code` params |
| **Signed URLs** | Encode/decode S3 or CDN signed URL components |
| **API development** | Encode payloads for URL query strings |
| **CI/CD** | Generate or verify tokens in pipelines |
| **CTF challenges** | Quick Base64 variant decoding |

## Comparison

| Feature | base64url-cli | `base64` (coreutils) | Node one-liner | Online tools |
|---------|:---:|:---:|:---:|:---:|
| URL-safe by default | ✅ | ❌ | ❌ | ✅ |
| Zero dependencies | ✅ | ✅ (system) | ✅ | N/A |
| Cross-platform | ✅ | ❌ (no Windows) | ✅ | ✅ |
| Stdin piping | ✅ | ✅ | Manual | ❌ |
| Strips padding | ✅ | ❌ | Manual | Varies |
| Install time | ~1s | Pre-installed | N/A | N/A |

## Related Tools

- [**jwt-inspect-cli**](https://github.com/kszongic/jwt-inspect-cli) — Decode and inspect JWT tokens
- [**string-hash-cli**](https://github.com/kszongic/string-hash-cli) — Hash strings from the terminal
- [**hash-file-cli**](https://github.com/kszongic/hash-file-cli) — Hash files with SHA-256/512/MD5
- [**hex-decode-cli**](https://github.com/kszongic/hex-decode-cli) — Decode hex strings to text
- [**checksum-verify-cli**](https://github.com/kszongic/checksum-verify-cli) — Verify file checksums cross-platform

## License

MIT © 2026 kszongic
