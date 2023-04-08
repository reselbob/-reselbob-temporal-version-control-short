#!/bin/bash
npm install

git checkout v1-error

P_ID=$(nohup npm start > output1.log 2>&1 & echo $!)

V1_ERR_ID=$(nohup npm run workflow-from-client > output2.log 2>&1 & echo $!)

echo "P_ID is $P_ID"

echo "V1_ERR_ID is $V1_ERR_ID"

# V1
sleep 150

echo "P_ID is $P_ID"

kill $P_ID

git checkout V1

V1_ID=$(nohup npm run workflow-from-client > output2.log 2>&1 & echo $!)

P_ID=$(nohup npm start > output1.log 2>&1 & echo $!)

echo "P_ID is $P_ID"

echo "V1_ID is $V1_ID"


# V2
sleep 150

kill $P_ID

git checkout V2

V2_ID=$(nohup npm run workflow-from-client > output2.log 2>&1 & echo $!)

P_ID=$(nohup npm start > output1.log 2>&1 & echo $!)

echo "P_ID is $P_ID"

echo "V2_ID is $V2_ID"

# V3

sleep 150

kill $P_ID

git checkout V3

V3_ID=$(nohup npm run workflow-from-client > output2.log 2>&1 & echo $!)

P_ID=$(nohup npm start > output1.log 2>&1 & echo $!)

echo "P_ID is $P_ID"

echo "V3_ID is $V3_ID"

# V4

sleep 150

kill $P_ID

git checkout V4

V4_ID=$(nohup npm run workflow-from-client > output2.log 2>&1 & echo $!)

P_ID=$(nohup npm start > output1.log 2>&1 & echo $!)

echo "P_ID is $P_ID"

echo "V4_ID is $V4_ID"

echo "All versions release"
