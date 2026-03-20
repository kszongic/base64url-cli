# @kszongic/base64url-cli

[![npm version](https://img.shields.io/npm/v/@kszongic/base64url-cli)](https://www.npmjs.com/package/@kszongic/base64url-cli)
[![license](https://img.shields.io/npm/l/@kszongic/base64url-cli)](./LICENSE)

Encode and decode **URL-safe Base64** ([RFC 4648 §5](https://datatracker.ietf.org/doc/html/rfc4648#section-5)) from the command line. Zero dependencies.

URL-safe Base64 replaces `+` with `-`, `/` with `_`, and strips padding `=`. It's used in JWTs, data URIs, and URL parameters.

## Install

```bash
npm install -g @kszongic/base64url-cli
```

## Usage

```bash
# Encode text
base64url encode "Hello, World!"
# SGVsbG8sIFdvcmxkIQ

# Decode
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

## Why URL-safe Base64?

Standard Base64 uses `+` and `/` which conflict with URLs and filenames. URL-safe Base64 swaps them for `-` and `_`, and drops trailing `=` padding. This tool handles the conversion transparently.

## License

MIT © 2026 kszongic
