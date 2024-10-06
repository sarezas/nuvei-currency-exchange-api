FROM node:22.9.0-slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 5001

CMD npm run start
