#!/bin/bash
npm install

git checkout V1-error

SLEEP_PERIOD=3600

RELEASE_MESSAGE="I will release a new version of the demonstration project every $SLEEP_PERIOD seconds"

echo $RELEASE_MESSAGE

echo "Firing off V1-error at $(date +"%Y-%m-%d %H:%M:%S")"

WORKER_ID=$(nohup ts-node src/worker.ts >> worker.log 2>&1 & echo $!)

V1_ERR_ID=$(nohup ts-node src/client.ts > outputv1-error.log 2>&1 & echo $!)

echo "WORKER_ID is $WORKER_ID"

echo "V1_ERR_ID is $V1_ERR_ID"

echo "Waiting ... on V1\n\n"

# V1
sleep $SLEEP_PERIOD

echo "Killing WORKER_ID $WORKER_ID"

kill $WORKER_ID

git checkout V1

echo "Firing off V1 at $(date +"%Y-%m-%d %H:%M:%S")"

V1_ID=$(nohup ts-node src/client.ts > outputv1.log 2>&1 & echo $!)

WORKER_ID=$(nohup ts-node src/worker.ts >> worker.log 2>&1 & echo $!)

echo "WORKER_ID is $WORKER_ID"

echo "V1_ID is $V1_ID"

echo "Waiting ... on V2\n\n"
# V2

sleep $SLEEP_PERIOD

echo "Killing WORKER_ID $WORKER_ID"

kill $WORKER_ID

git checkout V2

echo "Firing off V2 at $(date +"%Y-%m-%d %H:%M:%S")"

V2_ID=$(nohup ts-node src/client.ts > outputv2.log 2>&1 & echo $!)

WORKER_ID=$(nohup ts-node src/worker.ts >> worker.log 2>&1 & echo $!)

echo "WORKER_ID is $WORKER_ID"

echo "V2_ID is $V2_ID"

echo "Waiting ... on V3\n\n"

# V3

sleep $SLEEP_PERIOD

echo "Killing WORKER_ID $WORKER_ID"

kill $WORKER_ID

git checkout V3

echo "Firing off V3 at $(date +"%Y-%m-%d %H:%M:%S")"

V3_ID=$(nohup ts-node src/client.ts > output-v3.log 2>&1 & echo $!)

WORKER_ID=$(nohup ts-node src/worker.ts >> worker.log 2>&1 & echo $!)

echo "WORKER_ID is $WORKER_ID"

echo "V3_ID is $V3_ID"

echo "Waiting ... on V4\n\n"

# V4

sleep $SLEEP_PERIOD

echo "Killing WORKER_ID $WORKER_ID"

kill $WORKER_ID

git checkout V4

echo "Firing off V4 at $(date +"%Y-%m-%d %H:%M:%S")"

V4_ID=$(nohup ts-node src/client.ts > output-v4.log 2>&1 & echo $!)

WORKER_ID=$(nohup ts-node src/worker.ts >> worker.log 2>&1 & echo $!)

echo "WORKER_ID is $WORKER_ID"

echo "V4_ID is $V4_ID"

echo "\n\nAll versions released"

