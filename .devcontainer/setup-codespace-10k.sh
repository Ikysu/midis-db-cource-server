#!/bin/sh
gh codespace ports visibility 10000:public -c $CODESPACE_NAME
npm i && npm run dev