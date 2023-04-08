#!/bin/bash

git checkout v1-error

npm install

ts-node src/worker.ts

ts-node src/client.ts

PROC_ID=$(ps -aux | grep "sh \-c ts-node src/worker.ts" | awk '{print $2}')

echo $PROC_ID

# kill PROC_ID


sleep 150

echo "Hi 2"

sleep 150

echo "Hi 3"

sleep 150

echo "Hi 4"

sleep 150

echo "Hi 5"
