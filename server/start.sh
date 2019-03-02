#!/bin/sh
if [ "$NODE_ENV" = "production" ]; then
  node index.js
else
  nodemon --inspect=0.0.0.0:$DEBUG_PORT
fi
