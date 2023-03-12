# temporal-version-control-short
A project that demonstrates how to execute version control on short running Temporal Workflows

The project emulates a technical publishing workflow that consists of the following activities

- `getArticle()` //returns a string that is an article title
- `proofread(article:string)`
- `techEdit(article:string)`
- `copyEdit(article:string)`
- `formatEdit(article:string)`

The project gets a title of a random article from the file `./data/data.json` and processes it accordingly.

The workflow will run every 10 minutes.

# Running the demonstration code:

1. If the Temporal cluster is not running on the local machine, execute `sh ./setup-temporal-server.sh` Run the Temporal Server using Docker Compose.
2. Execute `npm install` to install the dependencies.
3. Execute `npm start` to start the Worker.
4. In another terminal window execute, `npm run workflow-from-client` to run the Workflow using the Temporal.io Client.
