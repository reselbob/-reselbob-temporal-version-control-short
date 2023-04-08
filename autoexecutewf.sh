#!/bin/bash
npm install

git checkout V1-error

SLEEP_PERIOD=200

P_ID=$(nohup npm start >> worker.log 2>&1 & echo $!)

V1_ERR_ID=$(nohup npm run workflow-from-client > outputv1-error.log 2>&1 & echo $!)

echo "P_ID is $P_ID"

echo "V1_ERR_ID is $V1_ERR_ID"

echo "Waiting ... on V1"

# V1
sleep $SLEEP_PERIOD

echo "P_ID is $P_ID"

kill $P_ID

git checkout V1

V1_ID=$(nohup npm run workflow-from-client > outputv1.log 2>&1 & echo $!)

P_ID=$(nohup npm start >> worker.log 2>&1 & echo $!)

echo "P_ID is $P_ID"

echo "V1_ID is $V1_ID"

echo "Waiting ... on V2"
# V2

sleep $SLEEP_PERIOD

kill $P_ID

git checkout V2

V2_ID=$(nohup npm run workflow-from-client > outputv2.log 2>&1 & echo $!)

P_ID=$(nohup npm start >> worker.log 2>&1 & echo $!)

echo "P_ID is $P_ID"

echo "V2_ID is $V2_ID"

echo "Waiting ... on V3"

# V3

sleep $SLEEP_PERIOD

kill $P_ID

git checkout V3

V3_ID=$(nohup npm run workflow-from-client > output-v3.log 2>&1 & echo $!)

P_ID=$(nohup npm start >> worker.log 2>&1 & echo $!)

echo "P_ID is $P_ID"

echo "V3_ID is $V3_ID"

echo "Waiting ... on V4"

# V4

sleep $SLEEP_PERIOD

kill $P_ID

git checkout V4

V4_ID=$(nohup npm run workflow-from-client > output-v4.log 2>&1 & echo $!)

P_ID=$(nohup npm start >> worker.log 2>&1 & echo $!)

echo "P_ID is $P_ID"

echo "V4_ID is $V4_ID"

echo "All versions released"

