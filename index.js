#!/usr/bin/env node
'use strict';

const usage = `Usage: base64url <command> [input]

Commands:
  encode <text>    Encode text to URL-safe Base64
  decode <b64>     Decode URL-safe Base64 to text

Input is read from arguments or stdin.

Options:
  -h, --help       Show this help
  -v, --version    Show version

Examples:
  base64url encode "Hello, World!"
  echo -n secret | base64url encode
  base64url decode aGVsbG8
`;

const args = process.argv.slice(2);

if (args.includes('-h') || args.includes('--help') || args.length === 0) {
  process.stdout.write(usage);
  process.exit(0);
}

if (args.includes('-v') || args.includes('--version')) {
  const pkg = require('./package.json');
  console.log(pkg.version);
  process.exit(0);
}

const command = args[0];
const input = args.slice(1).join(' ');

function toBase64Url(buf) {
  return buf.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function fromBase64Url(str) {
  let s = str.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  return Buffer.from(s, 'base64');
}

function run(data) {
  if (command === 'encode' || command === 'enc' || command === 'e') {
    process.stdout.write(toBase64Url(Buffer.from(data)) + '\n');
  } else if (command === 'decode' || command === 'dec' || command === 'd') {
    process.stdout.write(fromBase64Url(data.trim()).toString() + '\n');
  } else {
    console.error(`Unknown command: ${command}`);
    process.stdout.write(usage);
    process.exit(1);
  }
}

if (input) {
  run(input);
} else {
  let chunks = [];
  process.stdin.on('data', (c) => chunks.push(c));
  process.stdin.on('end', () => run(Buffer.concat(chunks).toString()));
}
