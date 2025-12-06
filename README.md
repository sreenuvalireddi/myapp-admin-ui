## Mock Server Setup
Create mock-server/db.json with this content

Then run npm install and npm run mock

A mock server is configured to run on port 3001 with json-server.

### Installation

Install dependencies (including json-server):
```bash
npm install
```

### Running the Mock Server

Start the mock server alone:
```bash
npm run mock
```

Or run both the dev server and mock server together:
```bash
npm run mock:dev
```

The mock server will be available at `http://localhost:3001`

### Development-only client-side mock

During development the front-end includes a built-in client-side mock for the shops list at the endpoint `/myapp/shops/v1.0`.

- This mock is active only when running the app in development (`import.meta.env.DEV`).
- No external mock server is required to test this endpoint in the browser.

To test the client-side mock:

```bash
# Start the dev server
npm run dev

# In the browser console (on the app origin) run:
fetch('/myapp/shops/v1.0').then(r => r.json()).then(console.log)
```

The response will be a JSON object with a `shops` array.

### Server-side mock

A server-side mock is available at `http://localhost:3001` and exposes the following endpoints (useful for testing from other tools or machines):

- `GET /myapp/shops/v1.0` — returns a JSON object `{ shops: [...] }`
- `GET /myapp/items/v1.0` — returns `{ items: [...] }`
- `GET /myapp/users/v1.0` — returns `{ users: [...] }`

Start the server-side mock:

```bash
# Run the mock server
npm run mock

# Or run both dev server + mock server
npm run mock:dev
```

The mock server implementation is in `mock-server/server.js` and can be edited to add more endpoints or change data.

### API Endpoints

- GET /shops - Get all shops
- GET /shops/:id - Get a specific shop
- POST /shops - Create a new shop
- PUT /shops/:id - Update a shop
- DELETE /shops/:id - Delete a shop

- GET /items - Get all items
- GET /items/:id - Get a specific item
- POST /items - Create a new item
- PUT /items/:id - Update an item
- DELETE /items/:id - Delete an item

- GET /users - Get all users
- GET /users/:id - Get a specific user
- POST /users - Create a new user

### Mock Data

Mock data is stored in `mock-server/db.json`
# myapp-ui

https://upgraded-fiesta-r474jwrj65x4cr49.github.dev/
