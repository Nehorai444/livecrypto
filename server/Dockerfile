FROM node:18
RUN npm install pm2 -g
WORKDIR /app/
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]