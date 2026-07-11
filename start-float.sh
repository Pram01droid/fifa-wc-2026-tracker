#!/bin/bash
cd "$(dirname "$0")"
if [ ! -d "node_modules/electron" ]; then
  echo "Installing Electron (one-time)…"
  npm install
fi
npm start
