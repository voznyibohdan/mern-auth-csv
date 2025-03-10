# MERN Authentication with CSV Processing


### Server Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```
PORT=5000
DATABASE_URL=mongodb://localhost:27017/your-database-name

JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key

ACCESS_TOKEN_LIFETIME=15m
REFRESH_TOKEN_LIFETIME=7d
```

### Client Environment Variables

Create a `.env` file in the `client` directory with the following variables:

```
VITE_API_URL=http://localhost:5000/api
```

## Installation & Running the Application

1. Install dependencies for the root, server, and client:
```
npm run install-all
```

2. To run both the client and server concurrently in development mode:

```
npm run dev
```

This will start:
- The server on http://localhost:5000 (or the port specified in your server .env file)
- The client on http://localhost:5173 (default Vite port)


## CSV

csv files can be found inside
```/server/uploads```