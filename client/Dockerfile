# Use Node.js as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the React app source code
COPY . .

# Build the React app for production
RUN npm run build

# Expose port 80 (this will be mapped to port 8080)
EXPOSE 80

# Use `serve` to serve the static files built by React
RUN npm install -g serve

CMD ["serve", "-s", "build"]
