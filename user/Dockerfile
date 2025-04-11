FROM node:15-alpine

WORKDIR /app

COPY package*.json yarn*.lock ./

RUN npm install

COPY . /app

EXPOSE 5001

CMD [ "node", "server.js" ]