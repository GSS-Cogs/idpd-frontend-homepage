FROM node:20.2.0

COPY . /app
WORKDIR /app

RUN yarn

