FROM node:14

COPY . /app
WORKDIR /app
COPY config.env.js /app/config.js

RUN npm install
CMD npm run-script serve
