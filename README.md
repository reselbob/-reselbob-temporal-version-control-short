# reselbob-temporal-version-control-short
A project that demonstrates how to execute version control on short running Temporal Workflows


# Running the demonstration code:

1. If the Temporal cluster is not running on the local machine, execute `sh ./setup-temporal-server.sh` Run the Temporal Server using Docker Compose.
2. Execute `npm install` to install the dependencies.
3. Execute `npm start` to start the Worker.
4. In another terminal window execute, `npm run workflow-from-client` to run the Workflow using the Temporal.io Client.
