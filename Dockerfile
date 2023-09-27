FROM node:20.5.0

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY dist /app/dist
COPY certificates /app/certificates
COPY server.js /app/

ENV API_TARGET=https://host.docker.internal:9090/api

CMD ["npm", "run", "start-prod"]
