# Use the official Node.js image.
FROM node:14

# Set the working directory for the server
WORKDIR /usr/src/app

# Copy server package files and install dependencies
COPY server/package*.json ./server/
RUN cd server && npm install

# Copy server source code
COPY server/ ./server/

# Set the working directory for the client
WORKDIR /usr/src/app/client

# Copy client package files and install dependencies
COPY client/package*.json ./client/
RUN cd client && npm install

# Copy client source code
COPY client/ ./client/

# Build the client app
RUN cd client && npm run build

# Move back to the server directory
WORKDIR /usr/src/app/server

# Expose the ports the app runs on.
EXPOSE 8000
EXPOSE 6000

# Run the web service on container startup.
CMD ["sh", "-c", "node server.js & node binanceWebSocket.js"]