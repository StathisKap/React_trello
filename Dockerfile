FROM node:latest

USER root

RUN chmod 1777 /tmp

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build
