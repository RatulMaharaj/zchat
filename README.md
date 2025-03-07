# zchat

An AI chat app built to demonstrate the capabilities of zero sync.

See https://x.com/aboodman/status/1894771044504006912 

## Features 

- Built with svelte (spa-only, no ssr)
- Chat are saved in sidebar and you can switch instantly between them
- Integration with AI is at server-level.
- Uses zero's sync for streaming to UI.
- Can be deployed w/ sst (or coolify + vercel) 
- Chats are filtered using sql ILIKE filter
- Supports ✨sharing✨ a chat in r/o mode



## Development setup

### Prerequisites

- You need to have a postgres server that is running and accessible. If you want to run one locally, I recommend [DBngin](https://dbngin.com/).
- An auth0 account for authentication. You can create a free account at [Auth0](https://auth0.com/).
- (Optionally) Python and rich for pretty formatting of the logs in development mode.


### Dependencies

Clone the repo and install dependencies:

```sh
pnpm install
```

### Environment variables

You will need to create `.env` file in the root of the project with the following variables:

```sh
# for frontend
PUBLIC_SERVER='http://localhost:4848'
PUBLIC_AUTH0_DOMAIN=""
PUBLIC_AUTH0_CLIENT_ID=""
PUBLIC_AUTH0_CALLBACK_URL="http://localhost:5173"
OPENAI_API_KEY=""
# ZERO_UPSTREAM_DB also used by frontend

# for zero-cache
ZERO_AUTH_JWKS_URL=""
DATABASE_URL="postgres://postgres@localhost:5432"
ZERO_UPSTREAM_DB="postgres://postgres@localhost:5432/zchat"
ZERO_CVR_DB="postgres://postgres@localhost:5432/zchat"
ZERO_CHANGE_DB="postgres://postgres@localhost:5432/zchat"

# local only
ZERO_REPLICA_FILE="/tmp/zchat_replica.db"
ZERO_LOG_LEVEL="debug"
ZERO_LOG_FORMAT="json"
```

### Running the app

In a terminal start the dev sync server:
```sh
pnpm run dev:zero-cache
# or run `pnpm run dev:cache` for pretty logging with python + rich
```

In another terminal, start the frontend:
```sh
pnpm run dev
```
This will start the frontend which can be accessed at `http://localhost:5173`