FROM node:12-alpine

WORKDIR /app

COPY .eslintrc.json ./
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./

COPY src ./src

# need this to build native modules like rpio
RUN apk add python make g++

RUN npm install
RUN npm run lint
RUN npm run build

CMD npm start
