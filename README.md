# Horizon Frontend

Frontend for the Horizon Private Server website.

## Requirements

- Node.js 24 or newer
- npm 11 or newer

## Development

Install dependencies:

```sh
npm install
```

Start the Vite development server at [http://localhost:3000](http://localhost:3000):

```sh
npm run dev
```

## Available scripts

- `npm run dev`: Start the development server on port 3000.
- `npm run build`: Type-check the project and create a production build in `dist`.
- `npm run preview`: Preview the production build on port 3000.
- `npm test`: Run the test suite once.
- `npm run test:watch`: Run tests in watch mode.

## Environment variables

Browser-accessible environment variables use Vite's `VITE_` prefix. See `.env` for the required API, WebSocket, and custom-map endpoints.
