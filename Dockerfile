FROM node:18.14.2-alpine3.17

WORKDIR /contact-app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD npm start